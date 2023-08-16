class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const isAcceptedPaymentMethodsValid =
      this.validatePaymentMethod(metodoDePagamento);
    const isCartEmpty = this.validateEmptyCart(itens);
    const isProductsAndQuantitiesValid =
      this.validateAcceptedProductsAndQuantities(itens);

    if (isAcceptedPaymentMethodsValid !== true) {
      return isAcceptedPaymentMethodsValid;
    }

    if (isCartEmpty !== true) {
      return isCartEmpty;
    }

    if (isProductsAndQuantitiesValid !== true) {
      return isProductsAndQuantitiesValid;
    }

    const splitedArray = itens.map((item) => item.split(","));

    const orderValues = this.getValueOfEachItem(splitedArray);

    const grossValue = this.calculateGrossValue(orderValues);

    const liquidValue = this.calculateLiquidValue(
      metodoDePagamento,
      grossValue
    );

    const formatedBillValue = this.formatedValue(liquidValue);
    return formatedBillValue;
  }

  validatePaymentMethod(metodoDePagamento) {
    const acceptedPaymentMethods = ["dinheiro", "debito", "credito"];
    const messageErrorPaymentMethods = "Forma de pagamento inválida!";

    if (!acceptedPaymentMethods.includes(metodoDePagamento)) {
      return messageErrorPaymentMethods;
    } else {
      return true;
    }
  }

  validateEmptyCart(itens) {
    const messageErrorEmptyCart = "Não há itens no carrinho de compra!";

    if (itens.length === 0) {
      return messageErrorEmptyCart;
    } else {
      return true;
    }
  }

  validateAcceptedProductsAndQuantities(itens) {
    const acceptedProducts = [
      "cafe",
      "chantily",
      "suco",
      "sanduiche",
      "queijo",
      "salgado",
      "combo1",
      "combo2",
    ];
    const messageErrorExtraWithoutPrincipal =
      "Item extra não pode ser pedido sem o principal";
    const messageErrorInvalidQuantity = "Quantidade inválida!";
    const messageErrorInvalidProduct = "Item inválido!";

    const newArray = itens.map((item) => item.split(","));

    let productsArray = [];
    let quantitiesArray = [];

    newArray.forEach((item) => {
      let [product, quantity] = item;
      productsArray.push(product);
      quantitiesArray.push(Number(quantity));
    });

    for (let i = 0; i < productsArray.length; i++) {
      const product = productsArray[i];
      if (!acceptedProducts.includes(product)) {
        return messageErrorInvalidProduct;
      }
    }

    if (quantitiesArray.includes(0) || quantitiesArray.includes("0")) {
      return messageErrorInvalidQuantity;
    }

    if (
      (productsArray.includes("chantily") && !productsArray.includes("cafe")) ||
      (productsArray.includes("queijo") && !productsArray.includes("sanduiche"))
    ) {
      return messageErrorExtraWithoutPrincipal;
    }
    return true;
  }

  getValueOfEachItem(splitedArray) {
    let billAmounts = [];

    splitedArray.forEach((item) => {
      let [product, quantity] = item;
      quantity = Number(quantity);

      switch (product) {
        case "cafe":
          quantity = 3.0 * quantity;
          break;
        case "chantily":
          quantity = 1.5 * quantity;
          break;
        case "suco":
          quantity = 6.2 * quantity;
          break;
        case "sanduiche":
          quantity = 6.5 * quantity;
          break;
        case "queijo":
          quantity = 2.0 * quantity;
          break;
        case "salgado":
          quantity = 7.25 * quantity;
          break;
        case "combo1":
          quantity = 9.5 * quantity;
          break;
        case "combo2":
          quantity = 7.5 * quantity;
          break;
      }

      billAmounts.push(quantity);
    });

    return billAmounts;
  }

  calculateGrossValue(productsArray) {
    const grossValue = productsArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return grossValue;
  }

  calculateLiquidValue(metodoDePagamento, grossValue) {
    let valueByPaymentMethod;
    if (metodoDePagamento === "dinheiro") {
      valueByPaymentMethod = grossValue - grossValue * 0.05;
    } else if (metodoDePagamento === "credito") {
      valueByPaymentMethod = grossValue + grossValue * 0.03;
    } else if (metodoDePagamento === "debito") {
      valueByPaymentMethod = grossValue;
    }

    return valueByPaymentMethod.toFixed(2);
  }

  formatedValue(value) {
    const newValue = value.toString().replace(".", ",");
    const formatedNewValue = `R$ ${newValue}`;
    return formatedNewValue;
  }
}

export { CaixaDaLanchonete };
