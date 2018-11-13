// https://developers.google.com/pay/api/web/guides/tutorial
const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];


const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];


const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        'gateway': 'example',
        'gatewayMerchantId': 'exampleGatewayMerchantId'
    }
};


const baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks
    }
};

const cardPaymentMethod = Object.assign({},
    baseCardPaymentMethod,
    {
        tokenizationSpecification: tokenizationSpecification
    });


let paymentsClient = null;


function getGoogleIsReadyToPayRequest() {
    return Object.assign({},
        baseRequest,
        {
            allowedPaymentMethods: [baseCardPaymentMethod]
        });
}


function getGooglePaymentDataRequest() {
    const paymentDataRequest = Object.assign({}, baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    paymentDataRequest.merchantInfo = {
        merchantName: 'Example Merchant'
    };
    return paymentDataRequest;
}


function getGooglePaymentsClient() {
    if (paymentsClient === null) {
        paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    }
    return paymentsClient;
}


function onGooglePayLoaded() {
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
        .then(function (response) {
            if (response.result) {
                addGooglePayButton();
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function addGooglePayButton() {
    const paymentsClient = getGooglePaymentsClient();
    const button = paymentsClient.createButton({
        onClick: onGooglePaymentButtonClicked,
    });
    document.getElementById('payment').appendChild(button);
}

function getGoogleTransactionInfo() {
    return {
        currencyCode: 'INR',
        totalPriceStatus: 'FINAL',
        totalPrice: '1.00'
    };
}


function prefetchGooglePaymentData() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'USD'
    };
    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.prefetchPaymentData(paymentDataRequest);
}


function onGooglePaymentButtonClicked() {
    const paymentDataRequest = getGooglePaymentDataRequest();
    paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    const paymentsClient = getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
            // handle the response
            processPayment(paymentData);
        })
        .catch(function (err) {
            // show error in developer console for debugging
            console.error(err);
        });
}


function processPayment(paymentData) {
    console.log(paymentData);
    // var obj = JSON.parse(paymentData.paymentMethodData);
    // console.log(obj);
    var element = document.getElementById('payment');
    var description = document.createTextNode(paymentData.paymentMethodData.description);
    element.appendChild(description);
}