(self["webpackChunkwallet_test"] = self["webpackChunkwallet_test"] || []).push([["src_js_wallet_buy_mjs"],{

/***/ "./src/js/wallet/buy.mjs":
/*!*******************************!*\
  !*** ./src/js/wallet/buy.mjs ***!
  \*******************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coinSelection_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coinSelection.mjs */ "./src/js/wallet/coinSelection.mjs");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_coinSelection_mjs__WEBPACK_IMPORTED_MODULE_0__]);
_coinSelection_mjs__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


window.$ = window.jQuery = Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! jquery */ "./node_modules/jquery/dist/jquery.js", 19));
var S = await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_emurgo_cardano-serialization-lib-browser_cardano_serialization_lib_js"), __webpack_require__.e("node_modules_emurgo_cardano-serialization-lib-browser_sync_recursive")]).then(__webpack_require__.bind(__webpack_require__, /*! @emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js */ "./node_modules/@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js"));
var _Buffer = (await __webpack_require__.e(/*! import() */ "vendors-node_modules_buffer_index_js").then(__webpack_require__.t.bind(__webpack_require__, /*! buffer/ */ "./node_modules/buffer/index.js", 19))).Buffer;

function activateCardano() {
  return _activateCardano.apply(this, arguments);
}

function _activateCardano() {
  _activateCardano = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var promise;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('connecting');
            _context2.next = 3;
            return cardano.enable();

          case 3:
            promise = _context2.sent;
            $("#connectBtn").text('Connected');
            $("#connectBtn").attr('class', 'btn btn-success');

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _activateCardano.apply(this, arguments);
}

activateCardano();

function getProtocolParameters() {
  return _getProtocolParameters.apply(this, arguments);
}

function _getProtocolParameters() {
  _getProtocolParameters = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var latest_block, slotnumber, p, value;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch('https://cardano-testnet.blockfrost.io/api/v0/blocks/latest', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'project_id': 'testnet1FmrwIDmsMhsHlJUGFIrL7RUqWZxnIno'
              },
              method: 'GET'
            }).then(function (response) {
              return response.json();
            });

          case 2:
            latest_block = _context3.sent;
            slotnumber = latest_block.slot; //console.log(slotnumber);

            _context3.next = 6;
            return fetch("https://cardano-testnet.blockfrost.io/api/v0/epochs/latest/parameters", {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'project_id': 'testnet1FmrwIDmsMhsHlJUGFIrL7RUqWZxnIno'
              },
              method: 'GET'
            }).then(function (response) {
              return response.json();
            });

          case 6:
            p = _context3.sent;

            if (!(p.status >= 400 && p.status < 600)) {
              _context3.next = 9;
              break;
            }

            throw new Error("Bad response from server");

          case 9:
            value = {
              linearFee: S.LinearFee["new"](S.BigNum.from_str(p.min_fee_a.toString()), S.BigNum.from_str(p.min_fee_b.toString())),
              minUtxo: S.BigNum.from_str(p.min_utxo),
              poolDeposit: S.BigNum.from_str(p.pool_deposit),
              keyDeposit: S.BigNum.from_str(p.key_deposit),
              maxTxSize: p.max_tx_size,
              slot: slotnumber
            }; //console.log(value);

            return _context3.abrupt("return", value);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getProtocolParameters.apply(this, arguments);
}

;

function triggerPay() {
  return _triggerPay.apply(this, arguments);
}

function _triggerPay() {
  _triggerPay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var user, address, offer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return cardano.getUsedAddresses();

          case 2:
            user = _context4.sent;
            address = "addr_test1qpu90ns7qdsxzzep9ly4d3jt2zc36npgx27gs7hdst7jq5lhdpyhy0xrvf6w8d7ugh2jkal3hrrytgs7rctcgrsfxvksjfsy3g";
            offer = 1000; // parseInt($("#cardano-offer").value);

            offer = document.getElementById("cardano-offer").value; //offer = parseInt($("#cardano-offer").value);
            // WORKS

            _context4.next = 8;
            return pay(address, offer);

          case 8:
            return _context4.abrupt("return", _context4.sent);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _triggerPay.apply(this, arguments);
}

function pay(_x, _x2) {
  return _pay.apply(this, arguments);
}

function _pay() {
  _pay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(addr, adaAmount) {
    var cardano, protocolParameters, lovelace, paymentAddr, rawUtxo, utxos, outputs, MULTIASSET_SIZE, VALUE_SIZE, totalAssets, selection, inputs, txBuilder, i, utxo, change, changeMultiAssets, partialChange, partialMultiAssets, policies, makeSplit, minAda, transaction, size, witneses, signedTx, txhash;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cardano = window.cardano;
            _context5.next = 3;
            return getProtocolParameters();

          case 3:
            protocolParameters = _context5.sent;
            lovelace = (parseFloat(adaAmount) * 1000000).toString();
            _context5.t0 = S.Address;
            _context5.t1 = _Buffer;
            _context5.next = 9;
            return cardano.getChangeAddress();

          case 9:
            _context5.t2 = _context5.sent;
            _context5.t3 = _context5.t1.from.call(_context5.t1, _context5.t2, 'hex');
            paymentAddr = _context5.t0.from_bytes.call(_context5.t0, _context5.t3).to_bech32();
            _context5.next = 14;
            return cardano.getUtxos();

          case 14:
            rawUtxo = _context5.sent;
            utxos = rawUtxo.map(function (u) {
              return S.TransactionUnspentOutput.from_bytes(_Buffer.from(u, 'hex'));
            });
            outputs = S.TransactionOutputs["new"]();
            outputs.add(S.TransactionOutput["new"](S.Address.from_bech32(addr), S.Value["new"](S.BigNum.from_str(lovelace))));
            MULTIASSET_SIZE = 5848;
            VALUE_SIZE = 5860;
            totalAssets = 0;
            _coinSelection_mjs__WEBPACK_IMPORTED_MODULE_0__.default.setProtocolParameters(protocolParameters.minUtxo.to_str(), protocolParameters.linearFee.coefficient().to_str(), protocolParameters.linearFee.constant().to_str(), protocolParameters.maxTxSize.toString());
            _context5.next = 24;
            return _coinSelection_mjs__WEBPACK_IMPORTED_MODULE_0__.default.randomImprove(utxos, outputs, 20 + totalAssets, protocolParameters.minUtxo.to_str());

          case 24:
            selection = _context5.sent;
            inputs = selection.input;
            txBuilder = S.TransactionBuilder["new"](protocolParameters.linearFee, protocolParameters.minUtxo, protocolParameters.poolDeposit, protocolParameters.keyDeposit);

            for (i = 0; i < inputs.length; i++) {
              utxo = inputs[i];
              txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount());
            } // var m = S.GeneralTransactionMetadata.new()
            // m.insert(S.BigNum.from_str('0'),S.encode_json_str_to_metadatum(JSON.stringify(JSONmetaData),0))
            // var metaData = S.TransactionMetadata.new(m)
            // txBuilder.set_metadata(metaData)


            txBuilder.add_output(outputs.get(0));
            change = selection.change;
            changeMultiAssets = change.multiasset(); // check if change value is too big for single output

            if (changeMultiAssets && change.to_bytes().length * 2 > VALUE_SIZE) {
              partialChange = S.Value["new"](S.BigNum.from_str('0'));
              partialMultiAssets = S.MultiAsset["new"]();
              policies = changeMultiAssets.keys();

              makeSplit = function makeSplit() {
                for (var j = 0; j < changeMultiAssets.len(); j++) {
                  var policy = policies.get(j);
                  var policyAssets = changeMultiAssets.get(policy);
                  var assetNames = policyAssets.keys();
                  var assets = S.Assets["new"]();

                  for (var k = 0; k < assetNames.len(); k++) {
                    var policyAsset = assetNames.get(k);
                    var quantity = policyAssets.get(policyAsset);
                    assets.insert(policyAsset, quantity); //check size

                    var checkMultiAssets = S.MultiAsset.from_bytes(partialMultiAssets.to_bytes());
                    checkMultiAssets.insert(policy, assets);

                    if (checkMultiAssets.to_bytes().length * 2 >= MULTIASSET_SIZE) {
                      partialMultiAssets.insert(policy, assets);
                      return;
                    }
                  }

                  partialMultiAssets.insert(policy, assets);
                }
              };

              makeSplit();
              partialChange.set_multiasset(partialMultiAssets);
              minAda = S.min_ada_required(partialChange, protocolParameters.minUtxo);
              partialChange.set_coin(minAda);
              txBuilder.add_output(S.TransactionOutput["new"](S.Address.from_bech32(paymentAddr), partialChange));
            }

            txBuilder.add_change_if_needed(S.Address.from_bech32(paymentAddr));
            transaction = S.Transaction["new"](txBuilder.build(), S.TransactionWitnessSet["new"]() //metaData
            );
            size = transaction.to_bytes().length * 2;

            if (!(size > protocolParameters.maxTxSize)) {
              _context5.next = 37;
              break;
            }

            throw ERROR.txTooBig;

          case 37:
            _context5.next = 39;
            return cardano.signTx(_Buffer.from(transaction.to_bytes(), 'hex').toString('hex'));

          case 39:
            witneses = _context5.sent;
            signedTx = S.Transaction["new"](transaction.body(), S.TransactionWitnessSet.from_bytes(_Buffer.from(witneses, "hex"))); // ,transaction.metadata()

            _context5.next = 43;
            return cardano.submitTx(_Buffer.from(signedTx.to_bytes(), 'hex').toString('hex'));

          case 43:
            txhash = _context5.sent;
            return _context5.abrupt("return", txhash);

          case 45:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _pay.apply(this, arguments);
}

$("#paybtn").on('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var txHash;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return triggerPay();

        case 3:
          txHash = _context.sent;
          console.log(txHash);
          alert(txHash);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 8]]);
})));
console.log('this is buy.js');
__webpack_handle_async_dependencies__();
}, 1);

/***/ })

}])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUNDLEdBQVI7O0FBTm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQXpCO0FBU0FELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FsbGV0X3Rlc3QvLi9zcmMvanMvd2FsbGV0L2J1eS5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvaW5TZWxlY3Rpb24gZnJvbSAnLi9jb2luU2VsZWN0aW9uLm1qcyc7XG53aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSBpbXBvcnQoXCJqcXVlcnlcIik7XG5jb25zdCBTID0gYXdhaXQgaW1wb3J0KCdAZW11cmdvL2NhcmRhbm8tc2VyaWFsaXphdGlvbi1saWItYnJvd3Nlci9jYXJkYW5vX3NlcmlhbGl6YXRpb25fbGliLmpzJylcbmNvbnN0IF9CdWZmZXIgPSAoYXdhaXQgaW1wb3J0KCdidWZmZXIvJykpLkJ1ZmZlclxuXG5hc3luYyBmdW5jdGlvbiBhY3RpdmF0ZUNhcmRhbm8oKXtcbiAgICBjb25zb2xlLmxvZygnY29ubmVjdGluZycpO1xuICAgIGNvbnN0IHByb21pc2UgPSBhd2FpdCBjYXJkYW5vLmVuYWJsZSgpXG4gICAgJChcIiNjb25uZWN0QnRuXCIpLnRleHQoJ0Nvbm5lY3RlZCcpO1xuICAgICQoXCIjY29ubmVjdEJ0blwiKS5hdHRyKCdjbGFzcycsICdidG4gYnRuLXN1Y2Nlc3MnKTtcbn1cbmFjdGl2YXRlQ2FyZGFubygpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRQcm90b2NvbFBhcmFtZXRlcnMoKSB7XG4gICAgLy8gdXNlIGJsb2NrZnJvc3QgYXBpIHRvIGdldCB0aGlzIGRhdGFcbiAgICAvLyBibG9ja2Zyb3N0UmVxdWVzdCB3aWxsIGJlIHVuZGVmaW5lZCBpbiB0aGlzIGV4YW1wbGVcbiAgICAvLyBjb25zdCBsYXRlc3RfYmxvY2sgPSBhd2FpdCBibG9ja2Zyb3N0UmVxdWVzdCgnL2Jsb2Nrcy9sYXRlc3QnKVxuICAgIGNvbnN0IGxhdGVzdF9ibG9jayA9IGF3YWl0IGZldGNoKCdodHRwczovL2NhcmRhbm8tdGVzdG5ldC5ibG9ja2Zyb3N0LmlvL2FwaS92MC9ibG9ja3MvbGF0ZXN0Jywge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdwcm9qZWN0X2lkJzogJ3Rlc3RuZXQxRm1yd0lEbXNNaHNIbEpVR0ZJckw3UlVxV1p4bklubydcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIHZhciBzbG90bnVtYmVyID0gbGF0ZXN0X2Jsb2NrLnNsb3Q7XG4gICAgLy9jb25zb2xlLmxvZyhzbG90bnVtYmVyKTtcbiAgICBcbiAgICBjb25zdCBwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vY2FyZGFuby10ZXN0bmV0LmJsb2NrZnJvc3QuaW8vYXBpL3YwL2Vwb2Nocy9sYXRlc3QvcGFyYW1ldGVyc2AsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAncHJvamVjdF9pZCc6ICd0ZXN0bmV0MUZtcndJRG1zTWhzSGxKVUdGSXJMN1JVcVdaeG5Jbm8nXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICBpZiAocC5zdGF0dXMgPj0gNDAwICYmIHAuc3RhdHVzIDwgNjAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCByZXNwb25zZSBmcm9tIHNlcnZlclwiKTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgIGxpbmVhckZlZTogUy5MaW5lYXJGZWUubmV3KFxuICAgICAgICBTLkJpZ051bS5mcm9tX3N0cihwLm1pbl9mZWVfYS50b1N0cmluZygpKSxcbiAgICAgICAgUy5CaWdOdW0uZnJvbV9zdHIocC5taW5fZmVlX2IudG9TdHJpbmcoKSlcbiAgICAgICAgKSxcbiAgICAgICAgbWluVXR4bzogUy5CaWdOdW0uZnJvbV9zdHIocC5taW5fdXR4byksXG4gICAgICAgIHBvb2xEZXBvc2l0OiBTLkJpZ051bS5mcm9tX3N0cihwLnBvb2xfZGVwb3NpdCksXG4gICAgICAgIGtleURlcG9zaXQ6IFMuQmlnTnVtLmZyb21fc3RyKHAua2V5X2RlcG9zaXQpLFxuICAgICAgICBtYXhUeFNpemU6IHAubWF4X3R4X3NpemUsXG4gICAgICAgIHNsb3Q6IHNsb3RudW1iZXIsXG4gICAgfTtcbiAgICAvL2NvbnNvbGUubG9nKHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5hc3luYyBmdW5jdGlvbiB0cmlnZ2VyUGF5KCkge1xuICAgIHZhciB1c2VyPSBhd2FpdCBjYXJkYW5vLmdldFVzZWRBZGRyZXNzZXMoKTtcbiAgICB2YXIgYWRkcmVzcz1cImFkZHJfdGVzdDFxcHU5MG5zN3Fkc3h6emVwOWx5NGQzanQyemMzNm5wZ3gyN2dzN2hkc3Q3anE1bGhkcHloeTB4cnZmNnc4ZDd1Z2gyamthbDNocnJ5dGdzN3JjdGNncnNmeHZrc2pmc3kzZ1wiXG4gICAgdmFyIG9mZmVyID0gMTAwMCAvLyBwYXJzZUludCgkKFwiI2NhcmRhbm8tb2ZmZXJcIikudmFsdWUpO1xuICAgIG9mZmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkYW5vLW9mZmVyXCIpLnZhbHVlXG5cdC8vb2ZmZXIgPSBwYXJzZUludCgkKFwiI2NhcmRhbm8tb2ZmZXJcIikudmFsdWUpO1xuICAgIC8vIFdPUktTXG4gICAgcmV0dXJuIGF3YWl0IHBheShhZGRyZXNzLCBvZmZlcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBheShhZGRyLCBhZGFBbW91bnQpe1xuICAgIGNvbnN0IGNhcmRhbm8gPSB3aW5kb3cuY2FyZGFub1xuICAgIGNvbnN0IHByb3RvY29sUGFyYW1ldGVycyA9IGF3YWl0IGdldFByb3RvY29sUGFyYW1ldGVycygpXG4gICAgY29uc3QgbG92ZWxhY2UgPSAocGFyc2VGbG9hdChhZGFBbW91bnQpICogMTAwMDAwMCkudG9TdHJpbmcoKVxuICAgIFx0XG4gICAgY29uc3QgcGF5bWVudEFkZHIgPSBTLkFkZHJlc3MuZnJvbV9ieXRlcyhfQnVmZmVyLmZyb20oYXdhaXQgY2FyZGFuby5nZXRDaGFuZ2VBZGRyZXNzKCksICdoZXgnKSkudG9fYmVjaDMyKClcbiAgICBjb25zdCByYXdVdHhvID0gYXdhaXQgY2FyZGFuby5nZXRVdHhvcygpXG4gICAgY29uc3QgdXR4b3MgPSByYXdVdHhvLm1hcCh1ID0+IFMuVHJhbnNhY3Rpb25VbnNwZW50T3V0cHV0LmZyb21fYnl0ZXMoX0J1ZmZlci5mcm9tKHUsICdoZXgnKSkpXG4gICAgY29uc3Qgb3V0cHV0cyA9IFMuVHJhbnNhY3Rpb25PdXRwdXRzLm5ldygpXG5cbiAgICBvdXRwdXRzLmFkZChcbiAgICAgICAgUy5UcmFuc2FjdGlvbk91dHB1dC5uZXcoXG4gICAgICAgICAgICBTLkFkZHJlc3MuZnJvbV9iZWNoMzIoYWRkciksXG4gICAgICAgICAgICBTLlZhbHVlLm5ldyhcbiAgICAgICAgICAgICAgICBTLkJpZ051bS5mcm9tX3N0cihsb3ZlbGFjZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IE1VTFRJQVNTRVRfU0laRSA9IDU4NDg7XG4gICAgY29uc3QgVkFMVUVfU0laRSA9IDU4NjA7XG4gICAgY29uc3QgdG90YWxBc3NldHMgPSAwXG5cbiAgICBDb2luU2VsZWN0aW9uLnNldFByb3RvY29sUGFyYW1ldGVycyhcbiAgICAgICAgcHJvdG9jb2xQYXJhbWV0ZXJzLm1pblV0eG8udG9fc3RyKCksXG4gICAgICAgIHByb3RvY29sUGFyYW1ldGVycy5saW5lYXJGZWUuY29lZmZpY2llbnQoKS50b19zdHIoKSxcbiAgICAgICAgcHJvdG9jb2xQYXJhbWV0ZXJzLmxpbmVhckZlZS5jb25zdGFudCgpLnRvX3N0cigpLFxuICAgICAgICBwcm90b2NvbFBhcmFtZXRlcnMubWF4VHhTaXplLnRvU3RyaW5nKClcbiAgICAgICk7XG4gICAgICBcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBhd2FpdCBDb2luU2VsZWN0aW9uLnJhbmRvbUltcHJvdmUoXG4gICAgICB1dHhvcyxcbiAgICAgIG91dHB1dHMsXG4gICAgICAyMCArIHRvdGFsQXNzZXRzLFxuICAgICAgcHJvdG9jb2xQYXJhbWV0ZXJzLm1pblV0eG8udG9fc3RyKClcbiAgICApO1xuXG4gICAgY29uc3QgaW5wdXRzID0gc2VsZWN0aW9uLmlucHV0O1xuICAgIGNvbnN0IHR4QnVpbGRlciA9IFMuVHJhbnNhY3Rpb25CdWlsZGVyLm5ldyhcbiAgICAgIHByb3RvY29sUGFyYW1ldGVycy5saW5lYXJGZWUsXG4gICAgICBwcm90b2NvbFBhcmFtZXRlcnMubWluVXR4byxcbiAgICAgIHByb3RvY29sUGFyYW1ldGVycy5wb29sRGVwb3NpdCxcbiAgICAgIHByb3RvY29sUGFyYW1ldGVycy5rZXlEZXBvc2l0XG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHV0eG8gPSBpbnB1dHNbaV07XG4gICAgICAgIHR4QnVpbGRlci5hZGRfaW5wdXQoXG4gICAgICAgICAgdXR4by5vdXRwdXQoKS5hZGRyZXNzKCksXG4gICAgICAgICAgdXR4by5pbnB1dCgpLFxuICAgICAgICAgIHV0eG8ub3V0cHV0KCkuYW1vdW50KClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAvLyB2YXIgbSA9IFMuR2VuZXJhbFRyYW5zYWN0aW9uTWV0YWRhdGEubmV3KClcbiAgICAvLyBtLmluc2VydChTLkJpZ051bS5mcm9tX3N0cignMCcpLFMuZW5jb2RlX2pzb25fc3RyX3RvX21ldGFkYXR1bShKU09OLnN0cmluZ2lmeShKU09ObWV0YURhdGEpLDApKVxuICAgIC8vIHZhciBtZXRhRGF0YSA9IFMuVHJhbnNhY3Rpb25NZXRhZGF0YS5uZXcobSlcbiAgICAvLyB0eEJ1aWxkZXIuc2V0X21ldGFkYXRhKG1ldGFEYXRhKVxuICAgIHR4QnVpbGRlci5hZGRfb3V0cHV0KG91dHB1dHMuZ2V0KDApKTtcblxuICAgIGNvbnN0IGNoYW5nZSA9IHNlbGVjdGlvbi5jaGFuZ2U7XG4gICAgY29uc3QgY2hhbmdlTXVsdGlBc3NldHMgPSBjaGFuZ2UubXVsdGlhc3NldCgpO1xuXG4gICAgLy8gY2hlY2sgaWYgY2hhbmdlIHZhbHVlIGlzIHRvbyBiaWcgZm9yIHNpbmdsZSBvdXRwdXRcbiAgICBpZiAoY2hhbmdlTXVsdGlBc3NldHMgJiYgY2hhbmdlLnRvX2J5dGVzKCkubGVuZ3RoICogMiA+IFZBTFVFX1NJWkUpIHtcbiAgICAgICAgY29uc3QgcGFydGlhbENoYW5nZSA9IFMuVmFsdWUubmV3KFxuICAgICAgICAgIFMuQmlnTnVtLmZyb21fc3RyKCcwJylcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgY29uc3QgcGFydGlhbE11bHRpQXNzZXRzID0gUy5NdWx0aUFzc2V0Lm5ldygpO1xuICAgICAgICBjb25zdCBwb2xpY2llcyA9IGNoYW5nZU11bHRpQXNzZXRzLmtleXMoKTtcbiAgICAgICAgY29uc3QgbWFrZVNwbGl0ID0gKCkgPT4ge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hhbmdlTXVsdGlBc3NldHMubGVuKCk7IGorKykge1xuICAgICAgICAgICAgY29uc3QgcG9saWN5ID0gcG9saWNpZXMuZ2V0KGopO1xuICAgICAgICAgICAgY29uc3QgcG9saWN5QXNzZXRzID0gY2hhbmdlTXVsdGlBc3NldHMuZ2V0KHBvbGljeSk7XG4gICAgICAgICAgICBjb25zdCBhc3NldE5hbWVzID0gcG9saWN5QXNzZXRzLmtleXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2V0cyA9IFMuQXNzZXRzLm5ldygpO1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBhc3NldE5hbWVzLmxlbigpOyBrKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgcG9saWN5QXNzZXQgPSBhc3NldE5hbWVzLmdldChrKTtcbiAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBwb2xpY3lBc3NldHMuZ2V0KHBvbGljeUFzc2V0KTtcbiAgICAgICAgICAgICAgYXNzZXRzLmluc2VydChwb2xpY3lBc3NldCwgcXVhbnRpdHkpO1xuICAgICAgICAgICAgICAvL2NoZWNrIHNpemVcbiAgICAgICAgICAgICAgY29uc3QgY2hlY2tNdWx0aUFzc2V0cyA9IFMuTXVsdGlBc3NldC5mcm9tX2J5dGVzKFxuICAgICAgICAgICAgICAgIHBhcnRpYWxNdWx0aUFzc2V0cy50b19ieXRlcygpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNoZWNrTXVsdGlBc3NldHMuaW5zZXJ0KHBvbGljeSwgYXNzZXRzKTtcbiAgICAgICAgICAgICAgaWYgKGNoZWNrTXVsdGlBc3NldHMudG9fYnl0ZXMoKS5sZW5ndGggKiAyID49IE1VTFRJQVNTRVRfU0laRSkge1xuICAgICAgICAgICAgICAgIHBhcnRpYWxNdWx0aUFzc2V0cy5pbnNlcnQocG9saWN5LCBhc3NldHMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydGlhbE11bHRpQXNzZXRzLmluc2VydChwb2xpY3ksIGFzc2V0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBtYWtlU3BsaXQoKTtcbiAgICAgICAgcGFydGlhbENoYW5nZS5zZXRfbXVsdGlhc3NldChwYXJ0aWFsTXVsdGlBc3NldHMpO1xuICAgICAgICBjb25zdCBtaW5BZGEgPSBTLm1pbl9hZGFfcmVxdWlyZWQoXG4gICAgICAgICAgcGFydGlhbENoYW5nZSxcbiAgICAgICAgICBwcm90b2NvbFBhcmFtZXRlcnMubWluVXR4b1xuICAgICAgICApO1xuICAgICAgICBwYXJ0aWFsQ2hhbmdlLnNldF9jb2luKG1pbkFkYSk7XG4gICAgXG4gICAgICAgIHR4QnVpbGRlci5hZGRfb3V0cHV0KFxuICAgICAgICAgIFMuVHJhbnNhY3Rpb25PdXRwdXQubmV3KFxuICAgICAgICAgICAgUy5BZGRyZXNzLmZyb21fYmVjaDMyKHBheW1lbnRBZGRyKSxcbiAgICAgICAgICAgIHBhcnRpYWxDaGFuZ2VcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdHhCdWlsZGVyLmFkZF9jaGFuZ2VfaWZfbmVlZGVkKFxuICAgICAgICBTLkFkZHJlc3MuZnJvbV9iZWNoMzIocGF5bWVudEFkZHIpXG4gICAgICApO1xuICAgICAgXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBTLlRyYW5zYWN0aW9uLm5ldyhcbiAgICAgICAgdHhCdWlsZGVyLmJ1aWxkKCksXG4gICAgICAgIFMuVHJhbnNhY3Rpb25XaXRuZXNzU2V0Lm5ldygpLFxuICAgICAgICAvL21ldGFEYXRhXG4gICAgKTtcblxuICAgIGNvbnN0IHNpemUgPSB0cmFuc2FjdGlvbi50b19ieXRlcygpLmxlbmd0aCAqIDI7XG4gICAgaWYgKHNpemUgPiBwcm90b2NvbFBhcmFtZXRlcnMubWF4VHhTaXplKSB0aHJvdyBFUlJPUi50eFRvb0JpZztcbiAgXG4gICAgY29uc3Qgd2l0bmVzZXMgPSBhd2FpdCBjYXJkYW5vLnNpZ25UeChfQnVmZmVyLmZyb20odHJhbnNhY3Rpb24udG9fYnl0ZXMoKSwnaGV4JykudG9TdHJpbmcoJ2hleCcpKVxuICAgIGNvbnN0IHNpZ25lZFR4ID0gUy5UcmFuc2FjdGlvbi5uZXcodHJhbnNhY3Rpb24uYm9keSgpLCBTLlRyYW5zYWN0aW9uV2l0bmVzc1NldC5mcm9tX2J5dGVzKF9CdWZmZXIuZnJvbSh3aXRuZXNlcyxcImhleFwiKSkpIC8vICx0cmFuc2FjdGlvbi5tZXRhZGF0YSgpXG4gICAgY29uc3QgdHhoYXNoID0gYXdhaXQgY2FyZGFuby5zdWJtaXRUeChfQnVmZmVyLmZyb20oc2lnbmVkVHgudG9fYnl0ZXMoKSwnaGV4JykudG9TdHJpbmcoJ2hleCcpKVxuXG4gICAgcmV0dXJuIHR4aGFzaFxufVxuXG4kKFwiI3BheWJ0blwiKS5vbignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB0eEhhc2ggPSBhd2FpdCB0cmlnZ2VyUGF5KCk7XG4gICAgICBjb25zb2xlLmxvZyh0eEhhc2gpXG4gICAgICBhbGVydCh0eEhhc2gpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgIH1cbn0pO1xuY29uc29sZS5sb2coJ3RoaXMgaXMgYnV5LmpzJyk7XG4iXSwibmFtZXMiOlsiQ29pblNlbGVjdGlvbiIsIndpbmRvdyIsIiQiLCJqUXVlcnkiLCJTIiwiX0J1ZmZlciIsIkJ1ZmZlciIsImFjdGl2YXRlQ2FyZGFubyIsImNvbnNvbGUiLCJsb2ciLCJjYXJkYW5vIiwiZW5hYmxlIiwicHJvbWlzZSIsInRleHQiLCJhdHRyIiwiZ2V0UHJvdG9jb2xQYXJhbWV0ZXJzIiwiZmV0Y2giLCJoZWFkZXJzIiwibWV0aG9kIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImxhdGVzdF9ibG9jayIsInNsb3RudW1iZXIiLCJzbG90IiwicCIsInN0YXR1cyIsIkVycm9yIiwidmFsdWUiLCJsaW5lYXJGZWUiLCJMaW5lYXJGZWUiLCJCaWdOdW0iLCJmcm9tX3N0ciIsIm1pbl9mZWVfYSIsInRvU3RyaW5nIiwibWluX2ZlZV9iIiwibWluVXR4byIsIm1pbl91dHhvIiwicG9vbERlcG9zaXQiLCJwb29sX2RlcG9zaXQiLCJrZXlEZXBvc2l0Iiwia2V5X2RlcG9zaXQiLCJtYXhUeFNpemUiLCJtYXhfdHhfc2l6ZSIsInRyaWdnZXJQYXkiLCJnZXRVc2VkQWRkcmVzc2VzIiwidXNlciIsImFkZHJlc3MiLCJvZmZlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXkiLCJhZGRyIiwiYWRhQW1vdW50IiwicHJvdG9jb2xQYXJhbWV0ZXJzIiwibG92ZWxhY2UiLCJwYXJzZUZsb2F0IiwiQWRkcmVzcyIsImdldENoYW5nZUFkZHJlc3MiLCJmcm9tIiwicGF5bWVudEFkZHIiLCJmcm9tX2J5dGVzIiwidG9fYmVjaDMyIiwiZ2V0VXR4b3MiLCJyYXdVdHhvIiwidXR4b3MiLCJtYXAiLCJ1IiwiVHJhbnNhY3Rpb25VbnNwZW50T3V0cHV0Iiwib3V0cHV0cyIsIlRyYW5zYWN0aW9uT3V0cHV0cyIsImFkZCIsIlRyYW5zYWN0aW9uT3V0cHV0IiwiZnJvbV9iZWNoMzIiLCJWYWx1ZSIsIk1VTFRJQVNTRVRfU0laRSIsIlZBTFVFX1NJWkUiLCJ0b3RhbEFzc2V0cyIsInNldFByb3RvY29sUGFyYW1ldGVycyIsInRvX3N0ciIsImNvZWZmaWNpZW50IiwiY29uc3RhbnQiLCJyYW5kb21JbXByb3ZlIiwic2VsZWN0aW9uIiwiaW5wdXRzIiwiaW5wdXQiLCJ0eEJ1aWxkZXIiLCJUcmFuc2FjdGlvbkJ1aWxkZXIiLCJpIiwibGVuZ3RoIiwidXR4byIsImFkZF9pbnB1dCIsIm91dHB1dCIsImFtb3VudCIsImFkZF9vdXRwdXQiLCJnZXQiLCJjaGFuZ2UiLCJjaGFuZ2VNdWx0aUFzc2V0cyIsIm11bHRpYXNzZXQiLCJ0b19ieXRlcyIsInBhcnRpYWxDaGFuZ2UiLCJwYXJ0aWFsTXVsdGlBc3NldHMiLCJNdWx0aUFzc2V0IiwicG9saWNpZXMiLCJrZXlzIiwibWFrZVNwbGl0IiwiaiIsImxlbiIsInBvbGljeSIsInBvbGljeUFzc2V0cyIsImFzc2V0TmFtZXMiLCJhc3NldHMiLCJBc3NldHMiLCJrIiwicG9saWN5QXNzZXQiLCJxdWFudGl0eSIsImluc2VydCIsImNoZWNrTXVsdGlBc3NldHMiLCJzZXRfbXVsdGlhc3NldCIsIm1pbkFkYSIsIm1pbl9hZGFfcmVxdWlyZWQiLCJzZXRfY29pbiIsImFkZF9jaGFuZ2VfaWZfbmVlZGVkIiwidHJhbnNhY3Rpb24iLCJUcmFuc2FjdGlvbiIsImJ1aWxkIiwiVHJhbnNhY3Rpb25XaXRuZXNzU2V0Iiwic2l6ZSIsIkVSUk9SIiwidHhUb29CaWciLCJzaWduVHgiLCJ3aXRuZXNlcyIsInNpZ25lZFR4IiwiYm9keSIsInN1Ym1pdFR4IiwidHhoYXNoIiwib24iLCJ0eEhhc2giLCJhbGVydCJdLCJzb3VyY2VSb290IjoiIn0=