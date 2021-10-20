const { Voucher } = require("../models");

const getVoucherList = async (req, res) => {
  try {
    const VoucherList = await Voucher.findAll();
    res.status(200).send(VoucherList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getVoucherDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const VoucherDetail = await Voucher.findOne({
      where: {
        id,
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
    if(checkVoucher){
      return res.status(500).send("da ton tai voucher co code nay")
    }
    await Voucher.create({
      VoucherCode,
      VoucherContent,
      VoucherStartDay,
      VoucherEndDay,
      VoucherDecrease,
    });
    const VoucherList = await Voucher.findAll();
    return res.status(200).send(VoucherList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const VoucherDetail = await Voucher.findOne({
      where: {
        id,
      },
    });
    if (VoucherDetail) {
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
      if(checkVoucher){
        return res.status(500).send("da ton tai voucher co code nay")
      }
      await Voucher.update(
        {
          VoucherCode,
          VoucherContent,
          VoucherStartDay,
          VoucherEndDay,
          VoucherDecrease,
        },
        {
          where: {
            id,
          },
        }
      );
      const VoucherList = await Voucher.findAll();
      return res.status(200).send(VoucherList);
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
    const { id } = req.params;
    const VoucherDetail = await Voucher.findOne({
      where: {
        id,
      },
    });
    if (VoucherDetail) {
      await Voucher.destroy({
        where: {
          id,
        },
      });
      const VoucherList = await Voucher.findAll();
      return res.status(200).send(VoucherList);
    } else{
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