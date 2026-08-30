import preferencesReducer, { toggleCategory, toggleDarkMode } from "./preferencesSlice";

describe("preferencesSlice", () => {
  const initialState = {
    selectedCategories: ["technology" as const],
    darkMode: false,
  };

  it("adds a category when it is not already selected", () => {
    const newState = preferencesReducer(initialState, toggleCategory("sports"));
    expect(newState.selectedCategories).toContain("sports");
    expect(newState.selectedCategories).toContain("technology");
  });

  it("removes a category when it is already selected", () => {
    const newState = preferencesReducer(initialState, toggleCategory("technology"));
    expect(newState.selectedCategories).not.toContain("technology");
  });

  it("toggles darkMode from false to true", () => {
    const newState = preferencesReducer(initialState, toggleDarkMode());
    expect(newState.darkMode).toBe(true);
  });

  it("toggles darkMode back to false when called twice", () => {
    const once = preferencesReducer(initialState, toggleDarkMode());
    const twice = preferencesReducer(once, toggleDarkMode());
    expect(twice.darkMode).toBe(false);
  });
});