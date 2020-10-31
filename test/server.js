const chai = require("chai");
const should = chai.should();

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../app/server");

describe("Color Code Converter API", () => {
  const data = {
    _method: "post",
    red: 255,
    green: 255,
    blue: 255,
  };
  describe("RGB to Hex conversion", () => {
    it("returns status 200", (done) => {
      chai
        .request(server)
        .post("/rgbToHex")
        .type("form")
        .send({ ...data })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("returns a string with length of 6", (done) => {
      chai
        .request(server)
        .post("/rgbToHex")
        .type("form")
        .send({ ...data })
        .end((err, res) => {
          res.body.should.have.property("hex");
          res.body.hex.should.be.a("string");
          res.body.hex.length.should.be.eql(6);
          done();
        });
    });
  });

  describe("hex to RGB conversion", () => {
    const data = {
      hex: "00ff00",
    };
    it("returns status 200", (done) => {
      chai
        .request(server)
        .post("/hexToRgb")
        .type("form")
        .send({ ...data })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("returns the color in RGB is an array of length 3", (done) => {
      chai
        .request(server)
        .post("/hexToRgb")
        .type("form")
        .send({ ...data })
        .end((err, res) => {
          res.body.should.have.property("rgb");
          res.body.rgb.should.be.a("array");
          res.body.rgb.length.should.be.eql(3);
          done();
        });
    });
  });
});
