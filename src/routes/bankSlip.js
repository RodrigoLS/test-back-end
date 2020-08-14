module.exports = app => {
  const controller = app.controllers.bankSlip;

  app.get('/digitable/line', controller.get);
}