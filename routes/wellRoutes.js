const models = require("../models");

module.exports = app => {
  // Search  By API14
  app.get("/oil-well", async (req, res) => {
    try {
      const wellsinfo = await models.Eagleford.findAll({
        where: {
          api14: 42051340170000
        }
      });
      res.json(wellsinfo);
      console.log(wellsinfo);
    } catch (error) {
      console.log(error);
    }
  });

  // Search By Field
  app.get("/field", async (req, res) => {
    try {
      const wellsinfo = await models.Eagleford.findAll({
        where: {
          field: "BRISCOE RANCH"
        }
      });
      res.json(wellsinfo);
    } catch (error) {
      console.log(error);
    }
  });

  // Search By Lease Name and Well Status
  app.get("/lease-name-well-status", async (req, res) => {
    try {
      const wellsinfo = await models.Eagleford.findAll({
        where: {
          leaseName: "R.H. PICKENS, ET AL B19 UNIT",
          wellStatus: "ACTIVE"
        }
      });
      res.json(wellsinfo);
    } catch (error) {
      console.log(erorr);
    }
  });

  app.get("/all-wells", async (req, res) => {
    try {
      const wellsinfo = models.Eagleford.findAll({
        limit: 10
      });
      res.json(wellsinfo);
    } catch (error) {
      console.log(error);
    }
  });
};
