import { page } from "vitest/browser";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import Page from "./+page.svelte";
import Events from "../modules/Events.svelte";

describe("/+page.svelte", () => {
  it("should render h1", async () => {
    render(Page);

    const heading = page.getByRole("heading", { name: "HARAMBE" });
    await expect.element(heading).toBeInTheDocument();
  });

  it("should render playoff information with team icons in Events", async () => {
    const { container } = await render(Events);

    const playoffTexts = container.querySelectorAll(".playoff-info");
    expect(playoffTexts.length).toBeGreaterThan(0);

    // Verify icons inside playoff-info
    const playoffIcons = container.querySelectorAll(".playoff-icon");
    expect(playoffIcons.length).toBeGreaterThan(0);

    const iconSrcs = Array.from(playoffIcons).map((img) => (img as HTMLImageElement).getAttribute("src"));
    expect(iconSrcs).toContain("/map/team-icons/20972.png");
    expect(iconSrcs).toContain("/map/team-icons/24928.png");
    // Verify default icon is used for edge cases without team-specific icon
    expect(iconSrcs.some(src => src === "/map/team-icons/default.png" || src === "/map/team-icons/20732.png")).toBe(true);

    // Verify decode regionals playoff has ATLAS_CNB_192 without "Team 20732"
    const textContent = Array.from(playoffTexts).map(el => el.textContent).join(" ");
    expect(textContent).toContain("ATLAS_CNB_192");
    expect(textContent).not.toContain("Team 20732");
  });
});

