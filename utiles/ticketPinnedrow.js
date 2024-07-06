const pinnedbuttonRow = (data) => {
  // console.log("PinnedRow", data);
  const seatcount = data?.reduce((preValue, curValue) => {
    if (curValue && curValue.seatCounts) {
      return preValue + curValue.seatCounts;
    } else {
      return preValue;
    }
  }, 0);

  const allPrice = data?.reduce((preValue, curValue) => {
    return preValue + curValue.AllPrice;
  }, 0);
  const refundPenaltyAmountSum = data?.reduce((preValue, curValue) => {
    if (curValue.refundedTicket) {
      return preValue + curValue.refundedTicket.refundPenaltyAmount;
    }
    return preValue;
  }, 0);
  const refundCoefficientAmountSum = data?.reduce((preValue, curValue) => {
    if (curValue.refundedTicket) {
      return preValue + curValue.refundedTicket.refundCoefficientAmount;
    }
    return preValue;
  }, 0);
  const totalAmountSum = data?.reduce((preValue, curValue) => {
    if (curValue.refundedTicket) {
      return preValue + curValue.refundedTicket.totalAmount;
    }
    return preValue;
  }, 0);

  return [
    {
      service: {
        company: { name: `ردیف: ${data?.length ? data?.length : "0"}` },
      },
      seatCounts: seatcount,
      AllPrice: allPrice,
      refundedTicket: {
        refundPenaltyAmount: refundPenaltyAmountSum,
        refundCoefficientAmount: refundCoefficientAmountSum,
        totalAmount: totalAmountSum,
      },
    },
  ];
};

export default pinnedbuttonRow;
