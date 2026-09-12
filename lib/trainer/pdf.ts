import "server-only";

import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";

// Renders the two plan sections to a simple, clean PDF. Interprets a small
// subset of Markdown (ATX headings, bullet/number lists, **bold**) and wraps
// text across pages. Returns raw PDF bytes for emailing as an attachment.

const PAGE_W = 595.28; // A4 portrait, points
const PAGE_H = 841.89;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;
const TEXT_COLOR = rgb(0.1, 0.12, 0.16);
const MUTED = rgb(0.35, 0.38, 0.44);

interface Ctx {
  doc: PDFDocument;
  font: PDFFont;
  bold: PDFFont;
  page: ReturnType<PDFDocument["addPage"]>;
  y: number;
}

function newPage(ctx: Ctx) {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.y = PAGE_H - MARGIN;
}

function ensureSpace(ctx: Ctx, needed: number) {
  if (ctx.y - needed < MARGIN) newPage(ctx);
}

/** Word-wrap `text` to CONTENT_W (minus indent) at the given font/size. */
function wrap(text: string, font: PDFFont, size: number, indent = 0): string[] {
  const maxW = CONTENT_W - indent;
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) <= maxW || !current) {
      current = trial;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function drawParagraph(
  ctx: Ctx,
  text: string,
  opts: { size?: number; font?: PDFFont; color?: typeof TEXT_COLOR; indent?: number; gap?: number } = {},
) {
  const size = opts.size ?? 11;
  const font = opts.font ?? ctx.font;
  const color = opts.color ?? TEXT_COLOR;
  const indent = opts.indent ?? 0;
  const lineH = size * 1.4;

  for (const line of wrap(text, font, size, indent)) {
    ensureSpace(ctx, lineH);
    ctx.page.drawText(line, {
      x: MARGIN + indent,
      y: ctx.y - size,
      size,
      font,
      color,
    });
    ctx.y -= lineH;
  }
  ctx.y -= opts.gap ?? 4;
}

/** Strips inline markdown markers we don't render as styles in the PDF. */
function stripInline(s: string): string {
  return s.replace(/\*\*/g, "").replace(/`/g, "").replace(/(^|[^*])\*([^*]+)\*/g, "$1$2");
}

function renderMarkdown(ctx: Ctx, md: string) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      ctx.y -= 4;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const size = level <= 1 ? 17 : level === 2 ? 14 : 12;
      ctx.y -= 6;
      drawParagraph(ctx, stripInline(heading[2]), { size, font: ctx.bold, gap: 5 });
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      ensureSpace(ctx, 15);
      ctx.page.drawText("•", { x: MARGIN + 6, y: ctx.y - 11, size: 11, font: ctx.font, color: MUTED });
      drawParagraph(ctx, stripInline(bullet[1]), { indent: 20, gap: 2 });
      continue;
    }

    const numbered = line.match(/^(\d+)\.\s+(.*)$/);
    if (numbered) {
      ensureSpace(ctx, 15);
      ctx.page.drawText(`${numbered[1]}.`, { x: MARGIN + 4, y: ctx.y - 11, size: 11, font: ctx.font, color: MUTED });
      drawParagraph(ctx, stripInline(numbered[2]), { indent: 22, gap: 2 });
      continue;
    }

    drawParagraph(ctx, stripInline(line));
  }
}

export interface PlanPdfInput {
  clientName: string;
  nutritionPlanText: string;
  workoutPlanText: string;
  needsClearance: boolean;
  generatedAt: string; // ISO
}

export async function generatePlanPdf(input: PlanPdfInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const ctx: Ctx = { doc, font, bold, page: doc.addPage([PAGE_W, PAGE_H]), y: PAGE_H - MARGIN };

  // Title block
  drawParagraph(ctx, `Personalized Plan — ${input.clientName}`, { size: 20, font: bold, gap: 2 });
  drawParagraph(ctx, `Prepared ${new Date(input.generatedAt).toLocaleDateString()}`, {
    size: 10,
    color: MUTED,
    gap: 10,
  });

  if (input.needsClearance) {
    drawParagraph(
      ctx,
      "Health note: A pre-exercise screening item was flagged. Physician clearance is recommended before beginning training. This plan is a conservative starting point pending that clearance.",
      { size: 10, font: bold, color: rgb(0.6, 0.2, 0.05), gap: 12 },
    );
  }

  renderMarkdown(ctx, input.nutritionPlanText || "## NUTRITION PLAN\n\n(No nutrition plan content.)");
  ctx.y -= 10;
  renderMarkdown(ctx, input.workoutPlanText || "## WORKOUT PLAN\n\n(No workout plan content.)");

  drawParagraph(ctx, "", { gap: 8 });
  drawParagraph(
    ctx,
    "This plan is provided for general fitness guidance and is not medical advice. Consult a physician before starting any new exercise or nutrition program.",
    { size: 8, color: MUTED },
  );

  return doc.save();
}
