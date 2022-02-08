const { Voucher } = require("../models");

const getVoucherList = async (req, res) => {
  try {
    const VoucherList = await Voucher.findAll();
    return res.status(200).send(VoucherList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getVoucherDetail = async (req, res) => {
  try {
    const { VoucherCode } = req.query;
    const VoucherDetail = await Voucher.findOne({
      where: {
        VoucherCode,
      },
    });
    if (VoucherDetail) {
      return res.status(200).send(VoucherDetail);
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createVoucher = async (req, res) => {
  try {
    const {
      VoucherCode,
      VoucherContent,
      VoucherStartDay,
      VoucherEndDay,
      VoucherDecrease,
    } = req.body;
    const checkVoucher = await Voucher.findOne({
      where: { VoucherCode },
    });
    if (checkVoucher) {
      return res.status(500).send("voucher already exists");
    }
    await Voucher.create({
      VoucherCode,
      VoucherContent,
      VoucherStartDay,
      VoucherEndDay,
      VoucherDecrease,
    });
    return res.status(200).send("create success");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateVoucher = async (req, res) => {
  try {
    const { VoucherCode } = req.query;
    const VoucherDetail = await Voucher.findOne({
      where: {
        VoucherCode,
      },
    });
    if (VoucherDetail) {
      const {
        VoucherCodeNew,
        VoucherContent,
        VoucherStartDay,
        VoucherEndDay,
        VoucherDecrease,
      } = req.body;
      const checkVoucher = await Voucher.findOne({
        where: { VoucherCode: VoucherCodeNew },
      });
      if (checkVoucher) {
        return res.status(500).send("voucher already exists");
      }
      await Voucher.update(
        {
          VoucherCode: VoucherCodeNew,
          VoucherContent,
          VoucherStartDay,
          VoucherEndDay,
          VoucherDecrease,
        },
        {
          where: {
            VoucherCode,
          },
        }
      );
      return res.status(200).send("update success");
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const deleteVoucher = async (req, res) => {
  try {
    const { VoucherCode } = req.query;
    const VoucherDetail = await Voucher.findOne({
      where: {
        VoucherCode,
      },
    });
    if (VoucherDetail) {
      await Voucher.destroy({
        where: {
          VoucherCode,
        },
      });
      return res.status(200).send("delete success");
    } else {
      return res.status(404).send("Not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getVoucherList,
  getVoucherDetail,
  createVoucher,
  updateVoucher,
  deleteVoucher,
};
