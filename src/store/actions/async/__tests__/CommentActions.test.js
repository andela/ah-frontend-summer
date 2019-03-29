import {getToken} from "..";
import {getLoggedInUser} from "../index";

const local_storage_mocks = [
    {
        getItem: () => "result"
    },
    {
        getItem: () => {}
    },
    {
        getItem: () => ""
    },
    {
        getItem: () => null
    },
];

describe('getToken tests', () => {
    it('returns the right token if it is set', () => {
        expect(getToken(local_storage_mocks[0])).toEqual("result");
    });

    it('throws a not logged in error if there is not token, it is null or if token is empty', () => {
        expect(() => getToken(local_storage_mocks[1])).toThrowError("Not logged in");
        expect(() => getToken(local_storage_mocks[2])).toThrowError("Not logged in");
        expect(() => getToken(local_storage_mocks[3])).toThrowError("Not logged in");
    });
});

describe('getLoggedInUser tests', () => {
    it('returns the right name if it is set', () => {
        expect(getLoggedInUser(local_storage_mocks[0])).toEqual("result");
    });

    it('returns an empty string otherwise', () => {
        expect(getLoggedInUser(local_storage_mocks[1])).toEqual("");
        expect(getLoggedInUser(local_storage_mocks[2])).toEqual("");
        expect(getLoggedInUser(local_storage_mocks[3])).toEqual("");
    });
});
