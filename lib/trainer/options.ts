// Select-field option lists for the intake form. Kept in one place so the form
// UI and any server-side validation reference the same canonical values.

export const GOAL_OPTIONS = [
  "Fat loss",
  "Muscle gain",
  "General fitness",
  "Athletic performance",
  "Health/rehab",
  "Other",
] as const;

export const LOCATION_OPTIONS = [
  "Commercial gym",
  "Home with basic equipment",
  "Home with no equipment",
  "Other",
] as const;

export const SESSION_LENGTH_OPTIONS = [
  "30 min",
  "45 min",
  "60 min",
  "90+ min",
] as const;

export const TRAINING_STYLE_OPTIONS = [
  "Free weights",
  "Machines",
  "Bodyweight",
  "Classes",
  "No preference",
] as const;

export const COMMUNICATION_OPTIONS = [
  "Text",
  "Email",
  "In-app message",
] as const;

export const ACTIVITY_LEVEL_OPTIONS = [
  "Sedentary",
  "Lightly active",
  "Moderately active",
  "Very active",
] as const;

export const TRAINING_HISTORY_OPTIONS = [
  "None",
  "Less than 1 year",
  "1-3 years",
  "3+ years",
] as const;

export const SEX_OPTIONS = ["Male", "Female", "Prefer not to say"] as const;

export const NUTRITION_PATTERN_OPTIONS = [
  "Omnivore",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Other",
] as const;

export const COOKING_TIME_OPTIONS = [
  "Cook most meals",
  "Limited time to cook",
  "Rarely cook",
] as const;
