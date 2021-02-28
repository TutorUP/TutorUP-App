import * as actions from "../src/redux/actions/profileActions";
import * as types from "../src/redux/actions/types";

describe("Get current user profile", () => {
  it("should create an action to get a profile", () => {
    const text = "Profile";
    const expectedAction = {
      type: types.GET_PROFILE,
      text,
    };
    expect(actions.getCurrentProfile(text)).toEqual(expectedAction);
  });
});

describe("Clear current profile", () => {
  it("should create an action to clear a profile", () => {
    const expectedAction = {
      type: types.CLEAR_CURRENT_PROFILE,
    };
    expect(actions.clearCurrentProfile()).toEqual(expectedAction);
  });
});

describe("Profile loading", () => {
  it("should create an action to indicate a loading profile", () => {
    const expectedAction = {
      type: types.PROFILE_LOADING,
    };
    expect(actions.setProfileLoading()).toEqual(expectedAction);
  });
});
