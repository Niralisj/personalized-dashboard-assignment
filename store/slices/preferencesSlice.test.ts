import preferencesReducer, { setCategory, toggleDarkMode } from "./preferencesSlice";

describe("preferencesSlice", () => {
  const initialState = {
    selectedCategory: null,
    darkMode: false,
  };

  it("sets a category when none is selected", () => {
    const newState = preferencesReducer(initialState, setCategory("sports"));
    expect(newState.selectedCategory).toBe("sports");
  });

  it("clears the category when the same category is clicked again", () => {
    const withSports = { ...initialState, selectedCategory: "sports" as const };
    const newState = preferencesReducer(withSports, setCategory("sports"));
    expect(newState.selectedCategory).toBeNull();
  });

  it("switches to a new category when a different one is clicked", () => {
    const withSports = { ...initialState, selectedCategory: "sports" as const };
    const newState = preferencesReducer(withSports, setCategory("technology"));
    expect(newState.selectedCategory).toBe("technology");
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