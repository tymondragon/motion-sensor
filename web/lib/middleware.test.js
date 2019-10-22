const middleware = require("./middleware");

describe("middleware", () => {
  describe(".withErrorHandling", () => {
    it("returns a function that captures errors and calls next", async () => {
      let passedInReq = null;
      let passedInRes = null;
      let passedInNext = null;
      const error = new Error("this is bad");

      const controllerFunc = async (req, res, next) => {
        passedInReq = req;
        passedInRes = res;
        passedInNext = next;
        throw error;
      };

      const withErrorHandling = middleware.withErrorHandling(controllerFunc);

      const req = {};
      const res = {};
      const next = sinon.fake();

      await withErrorHandling(req, res, next);

      expect(next).to.have.been.calledWith(error);
      expect(passedInReq).to.eq(req);
      expect(passedInRes).to.eq(res);
      expect(passedInNext).to.eq(next);
    });
  });
});