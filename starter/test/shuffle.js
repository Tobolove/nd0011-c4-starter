import { expect } from "chai";
import { shuffle } from "../src/shuffle.js";

describe("shuffle function", () => {
    it("should shuffle the elements", () => {
        const cards = [1, 2, 3, 4, 5];
        const shuffled = shuffle(cards);
        expect(shuffled).to.not.deep.equal(cards);
    });

    it("should return an array of the same length", () => {
        const cards = [1, 2, 3, 4, 5];
        const shuffled = shuffle(cards);
        expect(shuffled).to.have.lengthOf(cards.length);
    });

    it("should return a new array", () => {
        const cards = [1, 2, 3, 4, 5];
        const shuffled = shuffle(cards);
        expect(shuffled).to.not.equal(cards);
    });

    it("should contain the same elements as the original array", () => {
        const cards = [1, 2, 3, 4, 5];
        const shuffled = shuffle(cards);
        expect(shuffled.sort()).to.deep.equal(cards.sort());
    });
});
