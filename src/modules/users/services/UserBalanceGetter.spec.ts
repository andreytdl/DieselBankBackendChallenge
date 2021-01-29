import FakeBinoBankRepository from "@modules/binoBank/repositories/fakes/FakeBinoBankRepository";
import UserRepository from "@modules/users/repositories/UserRepository";

describe("User's Repository", () => {
    it("should be able to get balance", () => {
        //Creating the repositories
        const binoBank = new FakeBinoBankRepository()
        const userRepository = new UserRepository(binoBank)
        
        const balance = userRepository.getBalance()

        //expected balance
        expect(balance).toHaveProperty('balance');

    })
})