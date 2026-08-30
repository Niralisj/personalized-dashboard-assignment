import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "@/store/slices/preferencesSlice";
import SettingsPanel from "./SettingsPanel";

function renderWithStore() {
  const store = configureStore({
    reducer: { preferences: preferencesReducer },
  });
  render(
    <Provider store={store}>
      <SettingsPanel />
    </Provider>
  );
  return store;
}

describe("SettingsPanel", () => {
  it("renders all six category checkboxes", () => {
    renderWithStore();
    expect(screen.getByLabelText("technology")).toBeInTheDocument();
    expect(screen.getByLabelText("sports")).toBeInTheDocument();
    expect(screen.getByLabelText("business")).toBeInTheDocument();
  });

  it("shows technology as checked by default", () => {
    renderWithStore();
    expect(screen.getByLabelText("technology")).toBeChecked();
  });

  it("checking a new category updates the store", () => {
    const store = renderWithStore();
    fireEvent.click(screen.getByLabelText("sports"));
    const state = store.getState();
    expect(state.preferences.selectedCategories).toContain("sports");
  });
});