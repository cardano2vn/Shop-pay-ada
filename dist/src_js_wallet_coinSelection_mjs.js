(self["webpackChunkwallet_test"] = self["webpackChunkwallet_test"] || []).push([["src_js_wallet_coinSelection_mjs"],{

/***/ "./src/js/wallet/coinSelection.mjs":
/*!*****************************************!*\
  !*** ./src/js/wallet/coinSelection.mjs ***!
  \*****************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var S = await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_emurgo_cardano-serialization-lib-browser_cardano_serialization_lib_js"), __webpack_require__.e("node_modules_emurgo_cardano-serialization-lib-browser_sync_recursive")]).then(__webpack_require__.bind(__webpack_require__, /*! @emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js */ "./node_modules/@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js"));
var Loader = {
  Cardano: S
};
/**
 * BerryPool implementation of the __Random-Improve__ coin selection algorithm.
 *
 * = Overview
 *
 * The __Random-Improve__ coin selection algorithm works in __two phases__, by
 * /first/ selecting UTxO entries /at random/ to pay for each of the given
 * outputs, and /then/ attempting to /improve/ upon each of the selections.
 *
 * === Phase 1: Random Selection
 *
 * __In this phase, the algorithm randomly selects a minimal set of UTxO__
 * __entries to pay for each of the given outputs.__
 *
 * During this phase, the algorithm:
 *
 *   *  processes outputs in /descending order of coin value/.
 *
 *   *  maintains a /remaining UTxO set/, initially equal to the given
 *      /UTxO set/ parameter.
 *
 *   *  based on every output nature, generate a /native token UTxO subset/
 *      to narrow down to useful UTxO
 *
 *   *  maintains an /accumulated coin selection/, which is initially /empty/.
 *
 * For each output of value __/v/__, the algorithm /randomly/ selects entries
 * from the /remaining UTxO set/, until the total value of selected entries is
 * greater than or equal to __/v/__. The selected entries are then associated
 * with that output, and removed from the /remaining UTxO set/.
 *
 * This phase ends when every output has been associated with a selection of
 * UTxO entries.
 *
 * However, if the remaining UTxO set is completely exhausted before all
 * outputs can be processed, the algorithm terminates with an error.
 *
 * === Phase 2: Improvement
 *
 * __In this phase, the algorithm attempts to improve upon each of the UTxO__
 * __selections made in the previous phase, by conservatively expanding the__
 * __selection made for each output.__
 *
 * During this phase, the algorithm:
 *
 *   *  processes outputs in /ascending order of coin value/.
 *
 *   *  continues to maintain the /remaining UTxO set/ produced by the previous
 *      phase.
 *
 *   *  maintains an /accumulated coin selection/, initiated from previous phase.
 *
 * For each output of value __/v/__, the algorithm:
 *
 *  1.  __Calculates a /target range/__ for the total value of inputs used to
 *      pay for that output, defined by the triplet:
 *
 *      (/minimum/, /ideal/, /maximum/) = (/v/, /2v/, /3v/)
 *
 *  2.  __Attempts to /improve/ upon the /existing UTxO selection/__ for that
 *      output, by repeatedly selecting additional entries at random from the
 *      /remaining UTxO set/, stopping when the selection can be improved upon
 *      no further.
 *
 *      A selection with value /v1/ is considered to be an /improvement/ over a
 *      selection with value /v0/ if __all__ of the following conditions are
 *      satisfied:
 *
 *       * __Condition 1__: we have moved closer to the /ideal/ value:
 *
 *             abs (/ideal/ − /v1/) < abs (/ideal/ − /v0/)
 *
 *       * __Condition 2__: we have not exceeded the /maximum/ value:
 *
 *             /v1/ ≤ /maximum/
 *
 *       * __Condition 3__: when counting cumulatively across all outputs
 *       considered so far, we have not selected more than the /maximum/ number
 *       of UTxO entries specified by 'limit'.
 *
 *  3.  __Creates a /change value/__ for the output, equal to the total value
 *      of the /final UTxO selection/ for that output minus the value /v/ of
 *      that output.
 *
 *  4.  __Updates the /accumulated coin selection/__:
 *
 *       * Adds the /output/ to 'outputs'.
 *       * Adds the /improved UTxO selection/ to 'inputs'.
 *       * Adds the /change value/ to 'change'.
 *
 * This phase ends when every output has been processed, __or__ when the
 * /remaining UTxO set/ has been exhausted, whichever occurs sooner.
 *
 * = Termination
 *
 * When both phases are complete, the algorithm terminates.
 *
 * The /accumulated coin selection/ and /remaining UTxO set/ are returned to
 * the caller.
 *
 * === Failure Modes
 *
 * The algorithm terminates with an __error__ if:
 *
 *  1.  The /total value/ of the initial UTxO set (the amount of money
 *      /available/) is /less than/ the total value of the output list (the
 *      amount of money /required/).
 *
 *      See: __'InputsExhaustedError'__.
 *
 *  2.  The /number/ of UTxO entries needed to pay for the requested outputs
 *      would /exceed/ the upper limit specified by 'limit'.
 *
 *      See: __'InputLimitExceededError'__.
 *
 * == Motivating Principles
 *
 * There are several motivating principles behind the design of the algorithm.
 *
 * === Principle 1: Dust Management
 *
 * The probability that random selection will choose dust entries from a UTxO
 * set increases with the proportion of dust in the set.
 *
 * Therefore, for a UTxO set with a large amount of dust, there's a high
 * probability that a random subset will include a large amount of dust.
 *
 * === Principle 2: Change Management
 *
 * Ideally, coin selection algorithms should, over time, create a UTxO set that
 * has /useful/ outputs: outputs that will allow us to process future payments
 * with a minimum number of inputs.
 *
 * If for each payment request of value __/v/__ we create a change output of
 * /roughly/ the same value __/v/__, then we will end up with a distribution of
 * change values that matches the typical value distribution of payment
 * requests.
 *
 * === Principle 3: Performance Management
 *
 * Searching the UTxO set for additional entries to improve our change outputs
 * is /only/ useful if the UTxO set contains entries that are sufficiently
 * small enough. But it is precisely when the UTxO set contains many small
 * entries that it is less likely for a randomly-chosen UTxO entry to push the
 * total above the upper bound.
 */

/**
 * @typedef {Value[]} AmountList - List of 'Value' object
 */

/**
 * @typedef {TransactionUnspentOutput[]} UTxOList - List of UTxO
 */

/**
 * @typedef {Object} UTxOSelection - Coin Selection algorithm core object
 * @property {UTxOList} selection - Accumulated UTxO set.
 * @property {UTxOList} remaining - Remaining UTxO set.
 * @property {UTxOList} subset - Remaining UTxO set.
 * @property {Value} amount - UTxO amount of each requested token
 */

/**
 * @typedef {Object} ImproveRange - ImproveRange
 * @property {Value} ideal - Requested amount * 2
 * @property {Value} maximum - Requested amount * 3
 */

/**
 * @typedef {Object} SelectionResult - Coin Selection algorithm return
 * @property {UTxOList} input - Accumulated UTxO set.
 * @property {OutputList} output - Requested outputs.
 * @property {UTxOList} remaining - Remaining UTxO set.
 * @property {Value} amount - UTxO amount of each requested token
 * @property {Value} change - Accumulated change amount.
 */

/**
 * @typedef {Object} ProtocolParameters
 * @property {int} minUTxO
 * @property {int} minFeeA
 * @property {int} minFeeB
 * @property {int} maxTxSize
 */

/**
 * @type {ProtocolParameters}
 */

var protocolParameters = null;
/**
 * CoinSelection Module.
 * @module src/lib/CoinSelection
 */

var CoinSelection = {
  /**
   * Set protocol parameters required by the algorithm
   * @param {string} minUTxO
   * @param {string} minFeeA
   * @param {string} minFeeB
   * @param {string} maxTxSize
   */
  setProtocolParameters: function setProtocolParameters(minUTxO, minFeeA, minFeeB, maxTxSize) {
    protocolParameters = {
      minUTxO: minUTxO,
      minFeeA: minFeeA,
      minFeeB: minFeeB,
      maxTxSize: maxTxSize
    };
  },

  /**
   * Random-Improve coin selection algorithm
   * @param {UTxOList} inputs - The set of inputs available for selection.
   * @param {TransactionOutputs} outputs - The set of outputs requested for payment.
   * @param {int} limit - A limit on the number of inputs that can be selected.
   * @return {SelectionResult} - Coin Selection algorithm return
   */
  randomImprove: function () {
    var _randomImprove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(inputs, outputs, limit) {
      var _minUTxOValue, utxoSelection, mergedOutputsAmounts, splitOutputsAmounts;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (protocolParameters) {
                _context.next = 2;
                break;
              }

              throw new Error('Protocol parameters not set. Use setProtocolParameters().');

            case 2:
              // await Loader.load();
              _minUTxOValue = BigInt(outputs.len()) * BigInt(protocolParameters.minUTxO);
              /** @type {UTxOSelection} */

              utxoSelection = {
                selection: [],
                remaining: _toConsumableArray(inputs),
                // Shallow copy
                subset: [],
                amount: Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0'))
              };
              mergedOutputsAmounts = mergeOutputsAmounts(outputs); // Explode amount in an array of unique asset amount for comparison's sake

              splitOutputsAmounts = splitAmounts(mergedOutputsAmounts); // Phase 1: RandomSelect

              splitOutputsAmounts.forEach(function (output) {
                createSubSet(utxoSelection, output); // Narrow down for NatToken UTxO

                try {
                  utxoSelection = randomSelect(cloneUTxOSelection(utxoSelection), // Deep copy in case of fallback needed
                  output, limit - utxoSelection.selection.length, _minUTxOValue);
                } catch (e) {
                  if (e.message === 'INPUT_LIMIT_EXCEEDED') {
                    // Limit reached : Fallback on DescOrdAlgo
                    utxoSelection = descSelect(utxoSelection, output, limit - utxoSelection.selection.length, _minUTxOValue);
                  } else {
                    throw e;
                  }
                }
              }); // Phase 2: Improve

              splitOutputsAmounts = sortAmountList(splitOutputsAmounts);
              splitOutputsAmounts.forEach(function (output) {
                createSubSet(utxoSelection, output); // Narrow down for NatToken UTxO

                var range = {};
                range.ideal = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0')).checked_add(output).checked_add(output);
                range.maximum = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0')).checked_add(range.ideal).checked_add(output);
                improve(utxoSelection, output, limit - utxoSelection.selection.length, range);
              });
              return _context.abrupt("return", {
                input: utxoSelection.selection,
                output: outputs,
                remaining: utxoSelection.remaining,
                amount: utxoSelection.amount,
                change: utxoSelection.amount.checked_sub(mergedOutputsAmounts)
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function randomImprove(_x, _x2, _x3) {
      return _randomImprove.apply(this, arguments);
    }

    return randomImprove;
  }()
};
/**
 * Randomly select enough UTxO to fulfill requested outputs
 * @param {UTxOSelection} utxoSelection - The set of selected/available inputs.
 * @param {Value} outputAmount - Single compiled output qty requested for payment.
 * @param {int} limit - A limit on the number of inputs that can be selected.
 * @param {int} minUTxOValue - Network protocol 'minUTxOValue' current value.
 * @throws INPUT_LIMIT_EXCEEDED if the number of randomly picked inputs exceed 'limit' parameter.
 * @throws INPUTS_EXHAUSTED if all UTxO doesn't hold enough funds to pay for output.
 * @throws MIN_UTXO_ERROR if lovelace change is under 'minUTxOValue' parameter.
 * @return {UTxOSelection} - Successful random utxo selection.
 */

function randomSelect(utxoSelection, outputAmount, limit, minUTxOValue) {
  var nbFreeUTxO = utxoSelection.subset.length; // If quantity is met, return subset into remaining list and exit

  if (isQtyFulfilled(outputAmount, utxoSelection.amount, minUTxOValue, nbFreeUTxO)) {
    utxoSelection.remaining = [].concat(_toConsumableArray(utxoSelection.remaining), _toConsumableArray(utxoSelection.subset));
    utxoSelection.subset = [];
    return utxoSelection;
  }

  if (limit <= 0) {
    throw new Error('INPUT_LIMIT_EXCEEDED');
  }

  if (nbFreeUTxO <= 0) {
    if (isQtyFulfilled(outputAmount, utxoSelection.amount, 0, 0)) {
      throw new Error('MIN_UTXO_ERROR');
    }

    throw new Error('INPUTS_EXHAUSTED');
  }
  /** @type {TransactionUnspentOutput} utxo */


  var utxo = utxoSelection.subset.splice(Math.floor(Math.random() * nbFreeUTxO), 1).pop();
  utxoSelection.selection.push(utxo);
  utxoSelection.amount = addAmounts(utxo.output().amount(), utxoSelection.amount);
  return randomSelect(utxoSelection, outputAmount, limit - 1, minUTxOValue);
}
/**
 * Select enough UTxO in DESC order to fulfill requested outputs
 * @param {UTxOSelection} utxoSelection - The set of selected/available inputs.
 * @param {Value} outputAmount - Single compiled output qty requested for payment.
 * @param {int} limit - A limit on the number of inputs that can be selected.
 * @param {int} minUTxOValue - Network protocol 'minUTxOValue' current value.
 * @throws INPUT_LIMIT_EXCEEDED if the number of randomly picked inputs exceed 'limit' parameter.
 * @throws INPUTS_EXHAUSTED if all UTxO doesn't hold enough funds to pay for output.
 * @throws MIN_UTXO_ERROR if lovelace change is under 'minUTxOValue' parameter.
 * @return {UTxOSelection} - Successful random utxo selection.
 */


function descSelect(utxoSelection, outputAmount, limit, minUTxOValue) {
  // Sort UTxO subset in DESC order for required Output unit type
  utxoSelection.subset = utxoSelection.subset.sort(function (utxoA, utxoB) {
    return utxoB.output().amount().compare(utxoA.output().amount());
  });

  do {
    if (limit <= 0) {
      throw new Error('INPUT_LIMIT_EXCEEDED');
    }

    if (utxoSelection.subset.length <= 0) {
      if (isQtyFulfilled(outputAmount, utxoSelection.amount, 0, 0)) {
        throw new Error('MIN_UTXO_ERROR');
      }

      throw new Error('INPUTS_EXHAUSTED');
    }
    /** @type {TransactionUnspentOutput} utxo */


    var utxo = utxoSelection.subset.splice(0, 1).pop();
    utxoSelection.selection.push(utxo);
    utxoSelection.amount = addAmounts(utxo.output().amount(), utxoSelection.amount);
    limit--;
  } while (!isQtyFulfilled(outputAmount, utxoSelection.amount, minUTxOValue, utxoSelection.subset.length - 1)); // Quantity is met, return subset into remaining list and return selection


  utxoSelection.remaining = [].concat(_toConsumableArray(utxoSelection.remaining), _toConsumableArray(utxoSelection.subset));
  utxoSelection.subset = [];
  return utxoSelection;
}
/**
 * Try to improve selection by increasing input amount in [2x,3x] range.
 * @param {UTxOSelection} utxoSelection - The set of selected/available inputs.
 * @param {Value} outputAmount - Single compiled output qty requested for payment.
 * @param {int} limit - A limit on the number of inputs that can be selected.
 * @param {ImproveRange} range - Improvement range target values
 */


function improve(utxoSelection, outputAmount, limit, range) {
  var nbFreeUTxO = utxoSelection.subset.length;

  if (utxoSelection.amount.compare(range.ideal) >= 0 || nbFreeUTxO <= 0 || limit <= 0) {
    // Return subset in remaining
    utxoSelection.remaining = [].concat(_toConsumableArray(utxoSelection.remaining), _toConsumableArray(utxoSelection.subset));
    utxoSelection.subset = [];
    return;
  }
  /** @type {TransactionUnspentOutput} utxo */


  var utxo = utxoSelection.subset.splice(Math.floor(Math.random() * nbFreeUTxO), 1).pop();
  var newAmount = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0')).checked_add(utxo.output().amount()).checked_add(outputAmount);

  if (abs(getAmountValue(range.ideal) - getAmountValue(newAmount)) < abs(getAmountValue(range.ideal) - getAmountValue(outputAmount)) && newAmount.compare(range.maximum) <= 0) {
    utxoSelection.selection.push(utxo);
    utxoSelection.amount = addAmounts(utxo.output().amount(), utxoSelection.amount);
    limit--;
  } else {
    utxoSelection.remaining.push(utxo);
  }

  return improve(utxoSelection, outputAmount, limit, range);
}
/**
 * Compile all required outputs to a flat amounts list
 * @param {TransactionOutputs} outputs - The set of outputs requested for payment.
 * @return {Value} - The compiled set of amounts requested for payment.
 */


function mergeOutputsAmounts(outputs) {
  var compiledAmountList = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0'));

  for (var i = 0; i < outputs.len(); i++) {
    compiledAmountList = addAmounts(outputs.get(i).amount(), compiledAmountList);
  }

  return compiledAmountList;
}
/**
 * Add up an Amounts List values to another Amounts List
 * @param {Value} amounts - Set of amounts to be added.
 * @param {Value} compiledAmounts - The compiled set of amounts.
 * @return {Value}
 */


function addAmounts(amounts, compiledAmounts) {
  return compiledAmounts.checked_add(amounts);
}
/**
 * Split amounts contained in a single {Value} object in separate {Value} objects
 * @param {Value} amounts - Set of amounts to be split.
 * @throws MIN_UTXO_ERROR if lovelace change is under 'minUTxOValue' parameter.
 * @return {AmountList}
 */


function splitAmounts(amounts) {
  var splitAmounts = [];

  if (amounts.multiasset()) {
    var mA = amounts.multiasset();

    for (var i = 0; i < mA.keys().len(); i++) {
      var scriptHash = mA.keys().get(i);

      for (var j = 0; j < mA.get(scriptHash).keys().len(); j++) {
        var _assets = Loader.Cardano.Assets["new"]();

        var assetName = mA.get(scriptHash).keys().get(j);

        _assets.insert(Loader.Cardano.AssetName.from_bytes(assetName.to_bytes()), Loader.Cardano.BigNum.from_bytes(mA.get(scriptHash).get(assetName).to_bytes()));

        var _multiasset = Loader.Cardano.MultiAsset["new"]();

        _multiasset.insert(Loader.Cardano.ScriptHash.from_bytes(scriptHash.to_bytes()), _assets);

        var _value = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str('0'));

        _value.set_multiasset(_multiasset);

        splitAmounts.push(_value);
      }
    }
  } // Order assets by qty DESC


  splitAmounts = sortAmountList(splitAmounts, 'DESC'); // Insure lovelace is last to account for min ada requirement

  splitAmounts.push(Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_bytes(amounts.coin().to_bytes())));
  return splitAmounts;
}
/**
 * Sort a mismatched AmountList ASC/DESC
 * @param {AmountList} amountList - Set of mismatched amounts to be sorted.
 * @param {string} [sortOrder=ASC] - Order
 * @return {AmountList} - The sorted AmountList
 */


function sortAmountList(amountList) {
  var sortOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ASC';
  return amountList.sort(function (a, b) {
    var sortInt = sortOrder === 'DESC' ? BigInt(-1) : BigInt(1);
    return Number((getAmountValue(a) - getAmountValue(b)) * sortInt);
  });
}
/**
 * Return BigInt amount value
 * @param amount
 * @return {bigint}
 */


function getAmountValue(amount) {
  var val = BigInt(0);
  var lovelace = BigInt(amount.coin().to_str());

  if (lovelace > 0) {
    val = lovelace;
  } else if (amount.multiasset() && amount.multiasset().len() > 0) {
    var scriptHash = amount.multiasset().keys().get(0);
    var assetName = amount.multiasset().get(scriptHash).keys().get(0);
    val = BigInt(amount.multiasset().get(scriptHash).get(assetName).to_str());
  }

  return val;
}
/**
 * Narrow down remaining UTxO set in case of native token, use full set for lovelace
 * @param {UTxOSelection} utxoSelection - The set of selected/available inputs.
 * @param {Value} output - Single compiled output qty requested for payment.
 */


function createSubSet(utxoSelection, output) {
  if (BigInt(output.coin().to_str()) < BigInt(1)) {
    utxoSelection.remaining.forEach(function (utxo, index) {
      if (output.compare(utxo.output().amount()) !== undefined) {
        utxoSelection.subset.push(utxoSelection.remaining.splice(index, 1).pop());
      }
    });
  } else {
    utxoSelection.subset = utxoSelection.remaining.splice(0, utxoSelection.remaining.length);
  }
}
/**
 * Is Quantity Fulfilled Condition - Handle 'minUTxOValue' protocol parameter.
 * @param {Value} outputAmount - Single compiled output qty requested for payment.
 * @param {Value} cumulatedAmount - Single compiled accumulated UTxO qty.
 * @param {int} minUTxOValue - Network protocol 'minUTxOValue' current value.
 * @param {int} nbFreeUTxO - Number of free UTxO available.
 * @return {boolean}
 */


function isQtyFulfilled(outputAmount, cumulatedAmount, minUTxOValue, nbFreeUTxO) {
  var amount = outputAmount;

  if (minUTxOValue && BigInt(outputAmount.coin().to_str()) > 0) {
    var minAmount = Loader.Cardano.Value["new"](Loader.Cardano.min_ada_required(cumulatedAmount, Loader.Cardano.BigNum.from_str(minUTxOValue.toString()))); // Lovelace min amount to cover assets and number of output need to be met

    if (cumulatedAmount.compare(minAmount) < 0) return false; // If requested Lovelace lower than minAmount, plan for change

    if (outputAmount.compare(minAmount) < 0) {
      amount = minAmount.checked_add(Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str(protocolParameters.minUTxO)));
    } // Try covering the max fees


    if (nbFreeUTxO > 0) {
      var maxFee = BigInt(protocolParameters.minFeeA) * BigInt(protocolParameters.maxTxSize) + BigInt(protocolParameters.minFeeB);
      maxFee = Loader.Cardano.Value["new"](Loader.Cardano.BigNum.from_str(maxFee.toString()));
      amount = amount.checked_add(maxFee);
    }
  }

  return cumulatedAmount.compare(amount) >= 0;
}
/**
 * Return a deep copy of UTxOSelection
 * @param {UTxOSelection} utxoSelection
 * @return {UTxOSelection} Clone - Deep copy
 */


function cloneUTxOSelection(utxoSelection) {
  return {
    selection: cloneUTxOList(utxoSelection.selection),
    remaining: cloneUTxOList(utxoSelection.remaining),
    subset: cloneUTxOList(utxoSelection.subset),
    amount: cloneValue(utxoSelection.amount)
  };
}
/**
 * Return a deep copy of an UTxO List
 * @param {UTxOList} utxoList
 * @return {UTxOList} Cone - Deep copy
 */


var cloneUTxOList = function cloneUTxOList(utxoList) {
  return utxoList.map(function (utxo) {
    return Loader.Cardano.TransactionUnspentOutput.from_bytes(utxo.to_bytes());
  });
};
/**
 * Return a deep copy of a Value object
 * @param {Value} value
 * @return {Value} Cone - Deep copy
 */


var cloneValue = function cloneValue(value) {
  return Loader.Cardano.Value.from_bytes(value.to_bytes());
}; // Helper


function abs(big) {
  return big < 0 ? big * BigInt(-1) : big;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoinSelection);
__webpack_handle_async_dependencies__();
}, 1);

/***/ })

}])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWEsQ0FBQ3ZGLGFBQWEsQ0FBQ0UsU0FBZixDQUZuQjtBQUdMQyxJQUFBQSxNQUFNLEVBQUVvRixhQUFhLENBQUN2RixhQUFhLENBQUNHLE1BQWYsQ0FIaEI7QUFJTEMsSUFBQUEsTUFBTSxFQUFFb0YsVUFBVSxDQUFDeEYsYUFBYSxDQUFDSSxNQUFmO0FBSmIsR0FBUDtBQU1EO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBTW1GLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0UsUUFBRDtBQUFBLFNBQ3BCQSxRQUFRLENBQUNDLEdBQVQsQ0FBYSxVQUFDekQsSUFBRDtBQUFBLFdBQ1hsRCxNQUFNLENBQUNDLE9BQVAsQ0FBZUwsd0JBQWYsQ0FBd0NvRixVQUF4QyxDQUFtRDlCLElBQUksQ0FBQytCLFFBQUwsRUFBbkQsQ0FEVztBQUFBLEdBQWIsQ0FEb0I7QUFBQSxDQUF0QjtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQU13QixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDRyxLQUFEO0FBQUEsU0FBVzVHLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSCxLQUFmLENBQXFCa0YsVUFBckIsQ0FBZ0M0QixLQUFLLENBQUMzQixRQUFOLEVBQWhDLENBQVg7QUFBQSxDQUFuQixFQUVBOzs7QUFDQSxTQUFTbEIsR0FBVCxDQUFhOEMsR0FBYixFQUFrQjtBQUNoQixTQUFPQSxHQUFHLEdBQUcsQ0FBTixHQUFVQSxHQUFHLEdBQUc5RixNQUFNLENBQUMsQ0FBQyxDQUFGLENBQXRCLEdBQTZCOEYsR0FBcEM7QUFDRDs7QUFFRCxpRUFBZTFHLGFBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YWxsZXRfdGVzdC8uL3NyYy9qcy93YWxsZXQvY29pblNlbGVjdGlvbi5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgVHJhbnNhY3Rpb25VbnNwZW50T3V0cHV0LFxuICBUcmFuc2FjdGlvbk91dHB1dHMsXG4gIFZhbHVlLFxufSBmcm9tICdAZW11cmdvL2NhcmRhbm8tc2VyaWFsaXphdGlvbi1saWItYnJvd3Nlci9jYXJkYW5vX3NlcmlhbGl6YXRpb25fbGliLmpzJztcblxuY29uc3QgUyA9IGF3YWl0IGltcG9ydCgnQGVtdXJnby9jYXJkYW5vLXNlcmlhbGl6YXRpb24tbGliLWJyb3dzZXIvY2FyZGFub19zZXJpYWxpemF0aW9uX2xpYi5qcycpXG5cbmNvbnN0IExvYWRlciA9IHtcbiAgQ2FyZGFubzogU1xufVxuLyoqXG4gKiBCZXJyeVBvb2wgaW1wbGVtZW50YXRpb24gb2YgdGhlIF9fUmFuZG9tLUltcHJvdmVfXyBjb2luIHNlbGVjdGlvbiBhbGdvcml0aG0uXG4gKlxuICogPSBPdmVydmlld1xuICpcbiAqIFRoZSBfX1JhbmRvbS1JbXByb3ZlX18gY29pbiBzZWxlY3Rpb24gYWxnb3JpdGhtIHdvcmtzIGluIF9fdHdvIHBoYXNlc19fLCBieVxuICogL2ZpcnN0LyBzZWxlY3RpbmcgVVR4TyBlbnRyaWVzIC9hdCByYW5kb20vIHRvIHBheSBmb3IgZWFjaCBvZiB0aGUgZ2l2ZW5cbiAqIG91dHB1dHMsIGFuZCAvdGhlbi8gYXR0ZW1wdGluZyB0byAvaW1wcm92ZS8gdXBvbiBlYWNoIG9mIHRoZSBzZWxlY3Rpb25zLlxuICpcbiAqID09PSBQaGFzZSAxOiBSYW5kb20gU2VsZWN0aW9uXG4gKlxuICogX19JbiB0aGlzIHBoYXNlLCB0aGUgYWxnb3JpdGhtIHJhbmRvbWx5IHNlbGVjdHMgYSBtaW5pbWFsIHNldCBvZiBVVHhPX19cbiAqIF9fZW50cmllcyB0byBwYXkgZm9yIGVhY2ggb2YgdGhlIGdpdmVuIG91dHB1dHMuX19cbiAqXG4gKiBEdXJpbmcgdGhpcyBwaGFzZSwgdGhlIGFsZ29yaXRobTpcbiAqXG4gKiAgICogIHByb2Nlc3NlcyBvdXRwdXRzIGluIC9kZXNjZW5kaW5nIG9yZGVyIG9mIGNvaW4gdmFsdWUvLlxuICpcbiAqICAgKiAgbWFpbnRhaW5zIGEgL3JlbWFpbmluZyBVVHhPIHNldC8sIGluaXRpYWxseSBlcXVhbCB0byB0aGUgZ2l2ZW5cbiAqICAgICAgL1VUeE8gc2V0LyBwYXJhbWV0ZXIuXG4gKlxuICogICAqICBiYXNlZCBvbiBldmVyeSBvdXRwdXQgbmF0dXJlLCBnZW5lcmF0ZSBhIC9uYXRpdmUgdG9rZW4gVVR4TyBzdWJzZXQvXG4gKiAgICAgIHRvIG5hcnJvdyBkb3duIHRvIHVzZWZ1bCBVVHhPXG4gKlxuICogICAqICBtYWludGFpbnMgYW4gL2FjY3VtdWxhdGVkIGNvaW4gc2VsZWN0aW9uLywgd2hpY2ggaXMgaW5pdGlhbGx5IC9lbXB0eS8uXG4gKlxuICogRm9yIGVhY2ggb3V0cHV0IG9mIHZhbHVlIF9fL3YvX18sIHRoZSBhbGdvcml0aG0gL3JhbmRvbWx5LyBzZWxlY3RzIGVudHJpZXNcbiAqIGZyb20gdGhlIC9yZW1haW5pbmcgVVR4TyBzZXQvLCB1bnRpbCB0aGUgdG90YWwgdmFsdWUgb2Ygc2VsZWN0ZWQgZW50cmllcyBpc1xuICogZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIF9fL3YvX18uIFRoZSBzZWxlY3RlZCBlbnRyaWVzIGFyZSB0aGVuIGFzc29jaWF0ZWRcbiAqIHdpdGggdGhhdCBvdXRwdXQsIGFuZCByZW1vdmVkIGZyb20gdGhlIC9yZW1haW5pbmcgVVR4TyBzZXQvLlxuICpcbiAqIFRoaXMgcGhhc2UgZW5kcyB3aGVuIGV2ZXJ5IG91dHB1dCBoYXMgYmVlbiBhc3NvY2lhdGVkIHdpdGggYSBzZWxlY3Rpb24gb2ZcbiAqIFVUeE8gZW50cmllcy5cbiAqXG4gKiBIb3dldmVyLCBpZiB0aGUgcmVtYWluaW5nIFVUeE8gc2V0IGlzIGNvbXBsZXRlbHkgZXhoYXVzdGVkIGJlZm9yZSBhbGxcbiAqIG91dHB1dHMgY2FuIGJlIHByb2Nlc3NlZCwgdGhlIGFsZ29yaXRobSB0ZXJtaW5hdGVzIHdpdGggYW4gZXJyb3IuXG4gKlxuICogPT09IFBoYXNlIDI6IEltcHJvdmVtZW50XG4gKlxuICogX19JbiB0aGlzIHBoYXNlLCB0aGUgYWxnb3JpdGhtIGF0dGVtcHRzIHRvIGltcHJvdmUgdXBvbiBlYWNoIG9mIHRoZSBVVHhPX19cbiAqIF9fc2VsZWN0aW9ucyBtYWRlIGluIHRoZSBwcmV2aW91cyBwaGFzZSwgYnkgY29uc2VydmF0aXZlbHkgZXhwYW5kaW5nIHRoZV9fXG4gKiBfX3NlbGVjdGlvbiBtYWRlIGZvciBlYWNoIG91dHB1dC5fX1xuICpcbiAqIER1cmluZyB0aGlzIHBoYXNlLCB0aGUgYWxnb3JpdGhtOlxuICpcbiAqICAgKiAgcHJvY2Vzc2VzIG91dHB1dHMgaW4gL2FzY2VuZGluZyBvcmRlciBvZiBjb2luIHZhbHVlLy5cbiAqXG4gKiAgICogIGNvbnRpbnVlcyB0byBtYWludGFpbiB0aGUgL3JlbWFpbmluZyBVVHhPIHNldC8gcHJvZHVjZWQgYnkgdGhlIHByZXZpb3VzXG4gKiAgICAgIHBoYXNlLlxuICpcbiAqICAgKiAgbWFpbnRhaW5zIGFuIC9hY2N1bXVsYXRlZCBjb2luIHNlbGVjdGlvbi8sIGluaXRpYXRlZCBmcm9tIHByZXZpb3VzIHBoYXNlLlxuICpcbiAqIEZvciBlYWNoIG91dHB1dCBvZiB2YWx1ZSBfXy92L19fLCB0aGUgYWxnb3JpdGhtOlxuICpcbiAqICAxLiAgX19DYWxjdWxhdGVzIGEgL3RhcmdldCByYW5nZS9fXyBmb3IgdGhlIHRvdGFsIHZhbHVlIG9mIGlucHV0cyB1c2VkIHRvXG4gKiAgICAgIHBheSBmb3IgdGhhdCBvdXRwdXQsIGRlZmluZWQgYnkgdGhlIHRyaXBsZXQ6XG4gKlxuICogICAgICAoL21pbmltdW0vLCAvaWRlYWwvLCAvbWF4aW11bS8pID0gKC92LywgLzJ2LywgLzN2LylcbiAqXG4gKiAgMi4gIF9fQXR0ZW1wdHMgdG8gL2ltcHJvdmUvIHVwb24gdGhlIC9leGlzdGluZyBVVHhPIHNlbGVjdGlvbi9fXyBmb3IgdGhhdFxuICogICAgICBvdXRwdXQsIGJ5IHJlcGVhdGVkbHkgc2VsZWN0aW5nIGFkZGl0aW9uYWwgZW50cmllcyBhdCByYW5kb20gZnJvbSB0aGVcbiAqICAgICAgL3JlbWFpbmluZyBVVHhPIHNldC8sIHN0b3BwaW5nIHdoZW4gdGhlIHNlbGVjdGlvbiBjYW4gYmUgaW1wcm92ZWQgdXBvblxuICogICAgICBubyBmdXJ0aGVyLlxuICpcbiAqICAgICAgQSBzZWxlY3Rpb24gd2l0aCB2YWx1ZSAvdjEvIGlzIGNvbnNpZGVyZWQgdG8gYmUgYW4gL2ltcHJvdmVtZW50LyBvdmVyIGFcbiAqICAgICAgc2VsZWN0aW9uIHdpdGggdmFsdWUgL3YwLyBpZiBfX2FsbF9fIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcbiAqICAgICAgc2F0aXNmaWVkOlxuICpcbiAqICAgICAgICogX19Db25kaXRpb24gMV9fOiB3ZSBoYXZlIG1vdmVkIGNsb3NlciB0byB0aGUgL2lkZWFsLyB2YWx1ZTpcbiAqXG4gKiAgICAgICAgICAgICBhYnMgKC9pZGVhbC8g4oiSIC92MS8pIDwgYWJzICgvaWRlYWwvIOKIkiAvdjAvKVxuICpcbiAqICAgICAgICogX19Db25kaXRpb24gMl9fOiB3ZSBoYXZlIG5vdCBleGNlZWRlZCB0aGUgL21heGltdW0vIHZhbHVlOlxuICpcbiAqICAgICAgICAgICAgIC92MS8g4omkIC9tYXhpbXVtL1xuICpcbiAqICAgICAgICogX19Db25kaXRpb24gM19fOiB3aGVuIGNvdW50aW5nIGN1bXVsYXRpdmVseSBhY3Jvc3MgYWxsIG91dHB1dHNcbiAqICAgICAgIGNvbnNpZGVyZWQgc28gZmFyLCB3ZSBoYXZlIG5vdCBzZWxlY3RlZCBtb3JlIHRoYW4gdGhlIC9tYXhpbXVtLyBudW1iZXJcbiAqICAgICAgIG9mIFVUeE8gZW50cmllcyBzcGVjaWZpZWQgYnkgJ2xpbWl0Jy5cbiAqXG4gKiAgMy4gIF9fQ3JlYXRlcyBhIC9jaGFuZ2UgdmFsdWUvX18gZm9yIHRoZSBvdXRwdXQsIGVxdWFsIHRvIHRoZSB0b3RhbCB2YWx1ZVxuICogICAgICBvZiB0aGUgL2ZpbmFsIFVUeE8gc2VsZWN0aW9uLyBmb3IgdGhhdCBvdXRwdXQgbWludXMgdGhlIHZhbHVlIC92LyBvZlxuICogICAgICB0aGF0IG91dHB1dC5cbiAqXG4gKiAgNC4gIF9fVXBkYXRlcyB0aGUgL2FjY3VtdWxhdGVkIGNvaW4gc2VsZWN0aW9uL19fOlxuICpcbiAqICAgICAgICogQWRkcyB0aGUgL291dHB1dC8gdG8gJ291dHB1dHMnLlxuICogICAgICAgKiBBZGRzIHRoZSAvaW1wcm92ZWQgVVR4TyBzZWxlY3Rpb24vIHRvICdpbnB1dHMnLlxuICogICAgICAgKiBBZGRzIHRoZSAvY2hhbmdlIHZhbHVlLyB0byAnY2hhbmdlJy5cbiAqXG4gKiBUaGlzIHBoYXNlIGVuZHMgd2hlbiBldmVyeSBvdXRwdXQgaGFzIGJlZW4gcHJvY2Vzc2VkLCBfX29yX18gd2hlbiB0aGVcbiAqIC9yZW1haW5pbmcgVVR4TyBzZXQvIGhhcyBiZWVuIGV4aGF1c3RlZCwgd2hpY2hldmVyIG9jY3VycyBzb29uZXIuXG4gKlxuICogPSBUZXJtaW5hdGlvblxuICpcbiAqIFdoZW4gYm90aCBwaGFzZXMgYXJlIGNvbXBsZXRlLCB0aGUgYWxnb3JpdGhtIHRlcm1pbmF0ZXMuXG4gKlxuICogVGhlIC9hY2N1bXVsYXRlZCBjb2luIHNlbGVjdGlvbi8gYW5kIC9yZW1haW5pbmcgVVR4TyBzZXQvIGFyZSByZXR1cm5lZCB0b1xuICogdGhlIGNhbGxlci5cbiAqXG4gKiA9PT0gRmFpbHVyZSBNb2Rlc1xuICpcbiAqIFRoZSBhbGdvcml0aG0gdGVybWluYXRlcyB3aXRoIGFuIF9fZXJyb3JfXyBpZjpcbiAqXG4gKiAgMS4gIFRoZSAvdG90YWwgdmFsdWUvIG9mIHRoZSBpbml0aWFsIFVUeE8gc2V0ICh0aGUgYW1vdW50IG9mIG1vbmV5XG4gKiAgICAgIC9hdmFpbGFibGUvKSBpcyAvbGVzcyB0aGFuLyB0aGUgdG90YWwgdmFsdWUgb2YgdGhlIG91dHB1dCBsaXN0ICh0aGVcbiAqICAgICAgYW1vdW50IG9mIG1vbmV5IC9yZXF1aXJlZC8pLlxuICpcbiAqICAgICAgU2VlOiBfXydJbnB1dHNFeGhhdXN0ZWRFcnJvcidfXy5cbiAqXG4gKiAgMi4gIFRoZSAvbnVtYmVyLyBvZiBVVHhPIGVudHJpZXMgbmVlZGVkIHRvIHBheSBmb3IgdGhlIHJlcXVlc3RlZCBvdXRwdXRzXG4gKiAgICAgIHdvdWxkIC9leGNlZWQvIHRoZSB1cHBlciBsaW1pdCBzcGVjaWZpZWQgYnkgJ2xpbWl0Jy5cbiAqXG4gKiAgICAgIFNlZTogX18nSW5wdXRMaW1pdEV4Y2VlZGVkRXJyb3InX18uXG4gKlxuICogPT0gTW90aXZhdGluZyBQcmluY2lwbGVzXG4gKlxuICogVGhlcmUgYXJlIHNldmVyYWwgbW90aXZhdGluZyBwcmluY2lwbGVzIGJlaGluZCB0aGUgZGVzaWduIG9mIHRoZSBhbGdvcml0aG0uXG4gKlxuICogPT09IFByaW5jaXBsZSAxOiBEdXN0IE1hbmFnZW1lbnRcbiAqXG4gKiBUaGUgcHJvYmFiaWxpdHkgdGhhdCByYW5kb20gc2VsZWN0aW9uIHdpbGwgY2hvb3NlIGR1c3QgZW50cmllcyBmcm9tIGEgVVR4T1xuICogc2V0IGluY3JlYXNlcyB3aXRoIHRoZSBwcm9wb3J0aW9uIG9mIGR1c3QgaW4gdGhlIHNldC5cbiAqXG4gKiBUaGVyZWZvcmUsIGZvciBhIFVUeE8gc2V0IHdpdGggYSBsYXJnZSBhbW91bnQgb2YgZHVzdCwgdGhlcmUncyBhIGhpZ2hcbiAqIHByb2JhYmlsaXR5IHRoYXQgYSByYW5kb20gc3Vic2V0IHdpbGwgaW5jbHVkZSBhIGxhcmdlIGFtb3VudCBvZiBkdXN0LlxuICpcbiAqID09PSBQcmluY2lwbGUgMjogQ2hhbmdlIE1hbmFnZW1lbnRcbiAqXG4gKiBJZGVhbGx5LCBjb2luIHNlbGVjdGlvbiBhbGdvcml0aG1zIHNob3VsZCwgb3ZlciB0aW1lLCBjcmVhdGUgYSBVVHhPIHNldCB0aGF0XG4gKiBoYXMgL3VzZWZ1bC8gb3V0cHV0czogb3V0cHV0cyB0aGF0IHdpbGwgYWxsb3cgdXMgdG8gcHJvY2VzcyBmdXR1cmUgcGF5bWVudHNcbiAqIHdpdGggYSBtaW5pbXVtIG51bWJlciBvZiBpbnB1dHMuXG4gKlxuICogSWYgZm9yIGVhY2ggcGF5bWVudCByZXF1ZXN0IG9mIHZhbHVlIF9fL3YvX18gd2UgY3JlYXRlIGEgY2hhbmdlIG91dHB1dCBvZlxuICogL3JvdWdobHkvIHRoZSBzYW1lIHZhbHVlIF9fL3YvX18sIHRoZW4gd2Ugd2lsbCBlbmQgdXAgd2l0aCBhIGRpc3RyaWJ1dGlvbiBvZlxuICogY2hhbmdlIHZhbHVlcyB0aGF0IG1hdGNoZXMgdGhlIHR5cGljYWwgdmFsdWUgZGlzdHJpYnV0aW9uIG9mIHBheW1lbnRcbiAqIHJlcXVlc3RzLlxuICpcbiAqID09PSBQcmluY2lwbGUgMzogUGVyZm9ybWFuY2UgTWFuYWdlbWVudFxuICpcbiAqIFNlYXJjaGluZyB0aGUgVVR4TyBzZXQgZm9yIGFkZGl0aW9uYWwgZW50cmllcyB0byBpbXByb3ZlIG91ciBjaGFuZ2Ugb3V0cHV0c1xuICogaXMgL29ubHkvIHVzZWZ1bCBpZiB0aGUgVVR4TyBzZXQgY29udGFpbnMgZW50cmllcyB0aGF0IGFyZSBzdWZmaWNpZW50bHlcbiAqIHNtYWxsIGVub3VnaC4gQnV0IGl0IGlzIHByZWNpc2VseSB3aGVuIHRoZSBVVHhPIHNldCBjb250YWlucyBtYW55IHNtYWxsXG4gKiBlbnRyaWVzIHRoYXQgaXQgaXMgbGVzcyBsaWtlbHkgZm9yIGEgcmFuZG9tbHktY2hvc2VuIFVUeE8gZW50cnkgdG8gcHVzaCB0aGVcbiAqIHRvdGFsIGFib3ZlIHRoZSB1cHBlciBib3VuZC5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtWYWx1ZVtdfSBBbW91bnRMaXN0IC0gTGlzdCBvZiAnVmFsdWUnIG9iamVjdFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge1RyYW5zYWN0aW9uVW5zcGVudE91dHB1dFtdfSBVVHhPTGlzdCAtIExpc3Qgb2YgVVR4T1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVVR4T1NlbGVjdGlvbiAtIENvaW4gU2VsZWN0aW9uIGFsZ29yaXRobSBjb3JlIG9iamVjdFxuICogQHByb3BlcnR5IHtVVHhPTGlzdH0gc2VsZWN0aW9uIC0gQWNjdW11bGF0ZWQgVVR4TyBzZXQuXG4gKiBAcHJvcGVydHkge1VUeE9MaXN0fSByZW1haW5pbmcgLSBSZW1haW5pbmcgVVR4TyBzZXQuXG4gKiBAcHJvcGVydHkge1VUeE9MaXN0fSBzdWJzZXQgLSBSZW1haW5pbmcgVVR4TyBzZXQuXG4gKiBAcHJvcGVydHkge1ZhbHVlfSBhbW91bnQgLSBVVHhPIGFtb3VudCBvZiBlYWNoIHJlcXVlc3RlZCB0b2tlblxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSW1wcm92ZVJhbmdlIC0gSW1wcm92ZVJhbmdlXG4gKiBAcHJvcGVydHkge1ZhbHVlfSBpZGVhbCAtIFJlcXVlc3RlZCBhbW91bnQgKiAyXG4gKiBAcHJvcGVydHkge1ZhbHVlfSBtYXhpbXVtIC0gUmVxdWVzdGVkIGFtb3VudCAqIDNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNlbGVjdGlvblJlc3VsdCAtIENvaW4gU2VsZWN0aW9uIGFsZ29yaXRobSByZXR1cm5cbiAqIEBwcm9wZXJ0eSB7VVR4T0xpc3R9IGlucHV0IC0gQWNjdW11bGF0ZWQgVVR4TyBzZXQuXG4gKiBAcHJvcGVydHkge091dHB1dExpc3R9IG91dHB1dCAtIFJlcXVlc3RlZCBvdXRwdXRzLlxuICogQHByb3BlcnR5IHtVVHhPTGlzdH0gcmVtYWluaW5nIC0gUmVtYWluaW5nIFVUeE8gc2V0LlxuICogQHByb3BlcnR5IHtWYWx1ZX0gYW1vdW50IC0gVVR4TyBhbW91bnQgb2YgZWFjaCByZXF1ZXN0ZWQgdG9rZW5cbiAqIEBwcm9wZXJ0eSB7VmFsdWV9IGNoYW5nZSAtIEFjY3VtdWxhdGVkIGNoYW5nZSBhbW91bnQuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm90b2NvbFBhcmFtZXRlcnNcbiAqIEBwcm9wZXJ0eSB7aW50fSBtaW5VVHhPXG4gKiBAcHJvcGVydHkge2ludH0gbWluRmVlQVxuICogQHByb3BlcnR5IHtpbnR9IG1pbkZlZUJcbiAqIEBwcm9wZXJ0eSB7aW50fSBtYXhUeFNpemVcbiAqL1xuXG4vKipcbiAqIEB0eXBlIHtQcm90b2NvbFBhcmFtZXRlcnN9XG4gKi9cbmxldCBwcm90b2NvbFBhcmFtZXRlcnMgPSBudWxsO1xuXG4vKipcbiAqIENvaW5TZWxlY3Rpb24gTW9kdWxlLlxuICogQG1vZHVsZSBzcmMvbGliL0NvaW5TZWxlY3Rpb25cbiAqL1xuY29uc3QgQ29pblNlbGVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIFNldCBwcm90b2NvbCBwYXJhbWV0ZXJzIHJlcXVpcmVkIGJ5IHRoZSBhbGdvcml0aG1cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1pblVUeE9cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1pbkZlZUFcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1pbkZlZUJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1heFR4U2l6ZVxuICAgKi9cbiAgc2V0UHJvdG9jb2xQYXJhbWV0ZXJzOiAobWluVVR4TywgbWluRmVlQSwgbWluRmVlQiwgbWF4VHhTaXplKSA9PiB7XG4gICAgcHJvdG9jb2xQYXJhbWV0ZXJzID0ge1xuICAgICAgbWluVVR4TzogbWluVVR4TyxcbiAgICAgIG1pbkZlZUE6IG1pbkZlZUEsXG4gICAgICBtaW5GZWVCOiBtaW5GZWVCLFxuICAgICAgbWF4VHhTaXplOiBtYXhUeFNpemUsXG4gICAgfTtcbiAgfSxcbiAgLyoqXG4gICAqIFJhbmRvbS1JbXByb3ZlIGNvaW4gc2VsZWN0aW9uIGFsZ29yaXRobVxuICAgKiBAcGFyYW0ge1VUeE9MaXN0fSBpbnB1dHMgLSBUaGUgc2V0IG9mIGlucHV0cyBhdmFpbGFibGUgZm9yIHNlbGVjdGlvbi5cbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbk91dHB1dHN9IG91dHB1dHMgLSBUaGUgc2V0IG9mIG91dHB1dHMgcmVxdWVzdGVkIGZvciBwYXltZW50LlxuICAgKiBAcGFyYW0ge2ludH0gbGltaXQgLSBBIGxpbWl0IG9uIHRoZSBudW1iZXIgb2YgaW5wdXRzIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICAgKiBAcmV0dXJuIHtTZWxlY3Rpb25SZXN1bHR9IC0gQ29pbiBTZWxlY3Rpb24gYWxnb3JpdGhtIHJldHVyblxuICAgKi9cbiAgcmFuZG9tSW1wcm92ZTogYXN5bmMgKGlucHV0cywgb3V0cHV0cywgbGltaXQpID0+IHtcbiAgICBpZiAoIXByb3RvY29sUGFyYW1ldGVycylcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1Byb3RvY29sIHBhcmFtZXRlcnMgbm90IHNldC4gVXNlIHNldFByb3RvY29sUGFyYW1ldGVycygpLidcbiAgICAgICk7XG5cbiAgICAvLyBhd2FpdCBMb2FkZXIubG9hZCgpO1xuXG4gICAgY29uc3QgX21pblVUeE9WYWx1ZSA9XG4gICAgICBCaWdJbnQob3V0cHV0cy5sZW4oKSkgKiBCaWdJbnQocHJvdG9jb2xQYXJhbWV0ZXJzLm1pblVUeE8pO1xuXG4gICAgLyoqIEB0eXBlIHtVVHhPU2VsZWN0aW9ufSAqL1xuICAgIGxldCB1dHhvU2VsZWN0aW9uID0ge1xuICAgICAgc2VsZWN0aW9uOiBbXSxcbiAgICAgIHJlbWFpbmluZzogWy4uLmlucHV0c10sIC8vIFNoYWxsb3cgY29weVxuICAgICAgc3Vic2V0OiBbXSxcbiAgICAgIGFtb3VudDogTG9hZGVyLkNhcmRhbm8uVmFsdWUubmV3KExvYWRlci5DYXJkYW5vLkJpZ051bS5mcm9tX3N0cignMCcpKSxcbiAgICB9O1xuXG4gICAgbGV0IG1lcmdlZE91dHB1dHNBbW91bnRzID0gbWVyZ2VPdXRwdXRzQW1vdW50cyhvdXRwdXRzKTtcblxuICAgIC8vIEV4cGxvZGUgYW1vdW50IGluIGFuIGFycmF5IG9mIHVuaXF1ZSBhc3NldCBhbW91bnQgZm9yIGNvbXBhcmlzb24ncyBzYWtlXG4gICAgbGV0IHNwbGl0T3V0cHV0c0Ftb3VudHMgPSBzcGxpdEFtb3VudHMobWVyZ2VkT3V0cHV0c0Ftb3VudHMpO1xuXG4gICAgLy8gUGhhc2UgMTogUmFuZG9tU2VsZWN0XG4gICAgc3BsaXRPdXRwdXRzQW1vdW50cy5mb3JFYWNoKChvdXRwdXQpID0+IHtcbiAgICAgIGNyZWF0ZVN1YlNldCh1dHhvU2VsZWN0aW9uLCBvdXRwdXQpOyAvLyBOYXJyb3cgZG93biBmb3IgTmF0VG9rZW4gVVR4T1xuXG4gICAgICB0cnkge1xuICAgICAgICB1dHhvU2VsZWN0aW9uID0gcmFuZG9tU2VsZWN0KFxuICAgICAgICAgIGNsb25lVVR4T1NlbGVjdGlvbih1dHhvU2VsZWN0aW9uKSwgLy8gRGVlcCBjb3B5IGluIGNhc2Ugb2YgZmFsbGJhY2sgbmVlZGVkXG4gICAgICAgICAgb3V0cHV0LFxuICAgICAgICAgIGxpbWl0IC0gdXR4b1NlbGVjdGlvbi5zZWxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgIF9taW5VVHhPVmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGUubWVzc2FnZSA9PT0gJ0lOUFVUX0xJTUlUX0VYQ0VFREVEJykge1xuICAgICAgICAgIC8vIExpbWl0IHJlYWNoZWQgOiBGYWxsYmFjayBvbiBEZXNjT3JkQWxnb1xuICAgICAgICAgIHV0eG9TZWxlY3Rpb24gPSBkZXNjU2VsZWN0KFxuICAgICAgICAgICAgdXR4b1NlbGVjdGlvbixcbiAgICAgICAgICAgIG91dHB1dCxcbiAgICAgICAgICAgIGxpbWl0IC0gdXR4b1NlbGVjdGlvbi5zZWxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICAgICAgX21pblVUeE9WYWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUGhhc2UgMjogSW1wcm92ZVxuICAgIHNwbGl0T3V0cHV0c0Ftb3VudHMgPSBzb3J0QW1vdW50TGlzdChzcGxpdE91dHB1dHNBbW91bnRzKTtcblxuICAgIHNwbGl0T3V0cHV0c0Ftb3VudHMuZm9yRWFjaCgob3V0cHV0KSA9PiB7XG4gICAgICBjcmVhdGVTdWJTZXQodXR4b1NlbGVjdGlvbiwgb3V0cHV0KTsgLy8gTmFycm93IGRvd24gZm9yIE5hdFRva2VuIFVUeE9cblxuICAgICAgbGV0IHJhbmdlID0ge307XG4gICAgICByYW5nZS5pZGVhbCA9IExvYWRlci5DYXJkYW5vLlZhbHVlLm5ldyhcbiAgICAgICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fc3RyKCcwJylcbiAgICAgIClcbiAgICAgICAgLmNoZWNrZWRfYWRkKG91dHB1dClcbiAgICAgICAgLmNoZWNrZWRfYWRkKG91dHB1dCk7XG4gICAgICByYW5nZS5tYXhpbXVtID0gTG9hZGVyLkNhcmRhbm8uVmFsdWUubmV3KFxuICAgICAgICBMb2FkZXIuQ2FyZGFuby5CaWdOdW0uZnJvbV9zdHIoJzAnKVxuICAgICAgKVxuICAgICAgICAuY2hlY2tlZF9hZGQocmFuZ2UuaWRlYWwpXG4gICAgICAgIC5jaGVja2VkX2FkZChvdXRwdXQpO1xuXG4gICAgICBpbXByb3ZlKFxuICAgICAgICB1dHhvU2VsZWN0aW9uLFxuICAgICAgICBvdXRwdXQsXG4gICAgICAgIGxpbWl0IC0gdXR4b1NlbGVjdGlvbi5zZWxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICByYW5nZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBpbnB1dDogdXR4b1NlbGVjdGlvbi5zZWxlY3Rpb24sXG4gICAgICBvdXRwdXQ6IG91dHB1dHMsXG4gICAgICByZW1haW5pbmc6IHV0eG9TZWxlY3Rpb24ucmVtYWluaW5nLFxuICAgICAgYW1vdW50OiB1dHhvU2VsZWN0aW9uLmFtb3VudCxcbiAgICAgIGNoYW5nZTogdXR4b1NlbGVjdGlvbi5hbW91bnQuY2hlY2tlZF9zdWIobWVyZ2VkT3V0cHV0c0Ftb3VudHMpLFxuICAgIH07XG4gIH0sXG59O1xuXG4vKipcbiAqIFJhbmRvbWx5IHNlbGVjdCBlbm91Z2ggVVR4TyB0byBmdWxmaWxsIHJlcXVlc3RlZCBvdXRwdXRzXG4gKiBAcGFyYW0ge1VUeE9TZWxlY3Rpb259IHV0eG9TZWxlY3Rpb24gLSBUaGUgc2V0IG9mIHNlbGVjdGVkL2F2YWlsYWJsZSBpbnB1dHMuXG4gKiBAcGFyYW0ge1ZhbHVlfSBvdXRwdXRBbW91bnQgLSBTaW5nbGUgY29tcGlsZWQgb3V0cHV0IHF0eSByZXF1ZXN0ZWQgZm9yIHBheW1lbnQuXG4gKiBAcGFyYW0ge2ludH0gbGltaXQgLSBBIGxpbWl0IG9uIHRoZSBudW1iZXIgb2YgaW5wdXRzIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICogQHBhcmFtIHtpbnR9IG1pblVUeE9WYWx1ZSAtIE5ldHdvcmsgcHJvdG9jb2wgJ21pblVUeE9WYWx1ZScgY3VycmVudCB2YWx1ZS5cbiAqIEB0aHJvd3MgSU5QVVRfTElNSVRfRVhDRUVERUQgaWYgdGhlIG51bWJlciBvZiByYW5kb21seSBwaWNrZWQgaW5wdXRzIGV4Y2VlZCAnbGltaXQnIHBhcmFtZXRlci5cbiAqIEB0aHJvd3MgSU5QVVRTX0VYSEFVU1RFRCBpZiBhbGwgVVR4TyBkb2Vzbid0IGhvbGQgZW5vdWdoIGZ1bmRzIHRvIHBheSBmb3Igb3V0cHV0LlxuICogQHRocm93cyBNSU5fVVRYT19FUlJPUiBpZiBsb3ZlbGFjZSBjaGFuZ2UgaXMgdW5kZXIgJ21pblVUeE9WYWx1ZScgcGFyYW1ldGVyLlxuICogQHJldHVybiB7VVR4T1NlbGVjdGlvbn0gLSBTdWNjZXNzZnVsIHJhbmRvbSB1dHhvIHNlbGVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gcmFuZG9tU2VsZWN0KHV0eG9TZWxlY3Rpb24sIG91dHB1dEFtb3VudCwgbGltaXQsIG1pblVUeE9WYWx1ZSkge1xuICBsZXQgbmJGcmVlVVR4TyA9IHV0eG9TZWxlY3Rpb24uc3Vic2V0Lmxlbmd0aDtcbiAgLy8gSWYgcXVhbnRpdHkgaXMgbWV0LCByZXR1cm4gc3Vic2V0IGludG8gcmVtYWluaW5nIGxpc3QgYW5kIGV4aXRcbiAgaWYgKFxuICAgIGlzUXR5RnVsZmlsbGVkKG91dHB1dEFtb3VudCwgdXR4b1NlbGVjdGlvbi5hbW91bnQsIG1pblVUeE9WYWx1ZSwgbmJGcmVlVVR4TylcbiAgKSB7XG4gICAgdXR4b1NlbGVjdGlvbi5yZW1haW5pbmcgPSBbXG4gICAgICAuLi51dHhvU2VsZWN0aW9uLnJlbWFpbmluZyxcbiAgICAgIC4uLnV0eG9TZWxlY3Rpb24uc3Vic2V0LFxuICAgIF07XG4gICAgdXR4b1NlbGVjdGlvbi5zdWJzZXQgPSBbXTtcbiAgICByZXR1cm4gdXR4b1NlbGVjdGlvbjtcbiAgfVxuXG4gIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJTlBVVF9MSU1JVF9FWENFRURFRCcpO1xuICB9XG5cbiAgaWYgKG5iRnJlZVVUeE8gPD0gMCkge1xuICAgIGlmIChpc1F0eUZ1bGZpbGxlZChvdXRwdXRBbW91bnQsIHV0eG9TZWxlY3Rpb24uYW1vdW50LCAwLCAwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNSU5fVVRYT19FUlJPUicpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lOUFVUU19FWEhBVVNURUQnKTtcbiAgfVxuXG4gIC8qKiBAdHlwZSB7VHJhbnNhY3Rpb25VbnNwZW50T3V0cHV0fSB1dHhvICovXG4gIGxldCB1dHhvID0gdXR4b1NlbGVjdGlvbi5zdWJzZXRcbiAgICAuc3BsaWNlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5iRnJlZVVUeE8pLCAxKVxuICAgIC5wb3AoKTtcblxuICB1dHhvU2VsZWN0aW9uLnNlbGVjdGlvbi5wdXNoKHV0eG8pO1xuICB1dHhvU2VsZWN0aW9uLmFtb3VudCA9IGFkZEFtb3VudHMoXG4gICAgdXR4by5vdXRwdXQoKS5hbW91bnQoKSxcbiAgICB1dHhvU2VsZWN0aW9uLmFtb3VudFxuICApO1xuXG4gIHJldHVybiByYW5kb21TZWxlY3QodXR4b1NlbGVjdGlvbiwgb3V0cHV0QW1vdW50LCBsaW1pdCAtIDEsIG1pblVUeE9WYWx1ZSk7XG59XG5cbi8qKlxuICogU2VsZWN0IGVub3VnaCBVVHhPIGluIERFU0Mgb3JkZXIgdG8gZnVsZmlsbCByZXF1ZXN0ZWQgb3V0cHV0c1xuICogQHBhcmFtIHtVVHhPU2VsZWN0aW9ufSB1dHhvU2VsZWN0aW9uIC0gVGhlIHNldCBvZiBzZWxlY3RlZC9hdmFpbGFibGUgaW5wdXRzLlxuICogQHBhcmFtIHtWYWx1ZX0gb3V0cHV0QW1vdW50IC0gU2luZ2xlIGNvbXBpbGVkIG91dHB1dCBxdHkgcmVxdWVzdGVkIGZvciBwYXltZW50LlxuICogQHBhcmFtIHtpbnR9IGxpbWl0IC0gQSBsaW1pdCBvbiB0aGUgbnVtYmVyIG9mIGlucHV0cyB0aGF0IGNhbiBiZSBzZWxlY3RlZC5cbiAqIEBwYXJhbSB7aW50fSBtaW5VVHhPVmFsdWUgLSBOZXR3b3JrIHByb3RvY29sICdtaW5VVHhPVmFsdWUnIGN1cnJlbnQgdmFsdWUuXG4gKiBAdGhyb3dzIElOUFVUX0xJTUlUX0VYQ0VFREVEIGlmIHRoZSBudW1iZXIgb2YgcmFuZG9tbHkgcGlja2VkIGlucHV0cyBleGNlZWQgJ2xpbWl0JyBwYXJhbWV0ZXIuXG4gKiBAdGhyb3dzIElOUFVUU19FWEhBVVNURUQgaWYgYWxsIFVUeE8gZG9lc24ndCBob2xkIGVub3VnaCBmdW5kcyB0byBwYXkgZm9yIG91dHB1dC5cbiAqIEB0aHJvd3MgTUlOX1VUWE9fRVJST1IgaWYgbG92ZWxhY2UgY2hhbmdlIGlzIHVuZGVyICdtaW5VVHhPVmFsdWUnIHBhcmFtZXRlci5cbiAqIEByZXR1cm4ge1VUeE9TZWxlY3Rpb259IC0gU3VjY2Vzc2Z1bCByYW5kb20gdXR4byBzZWxlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGRlc2NTZWxlY3QodXR4b1NlbGVjdGlvbiwgb3V0cHV0QW1vdW50LCBsaW1pdCwgbWluVVR4T1ZhbHVlKSB7XG4gIC8vIFNvcnQgVVR4TyBzdWJzZXQgaW4gREVTQyBvcmRlciBmb3IgcmVxdWlyZWQgT3V0cHV0IHVuaXQgdHlwZVxuICB1dHhvU2VsZWN0aW9uLnN1YnNldCA9IHV0eG9TZWxlY3Rpb24uc3Vic2V0LnNvcnQoKHV0eG9BLCB1dHhvQikgPT5cbiAgICB1dHhvQi5vdXRwdXQoKS5hbW91bnQoKS5jb21wYXJlKHV0eG9BLm91dHB1dCgpLmFtb3VudCgpKVxuICApO1xuXG4gIGRvIHtcbiAgICBpZiAobGltaXQgPD0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJTlBVVF9MSU1JVF9FWENFRURFRCcpO1xuICAgIH1cblxuICAgIGlmICh1dHhvU2VsZWN0aW9uLnN1YnNldC5sZW5ndGggPD0gMCkge1xuICAgICAgaWYgKGlzUXR5RnVsZmlsbGVkKG91dHB1dEFtb3VudCwgdXR4b1NlbGVjdGlvbi5hbW91bnQsIDAsIDApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTUlOX1VUWE9fRVJST1InKTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignSU5QVVRTX0VYSEFVU1RFRCcpO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7VHJhbnNhY3Rpb25VbnNwZW50T3V0cHV0fSB1dHhvICovXG4gICAgbGV0IHV0eG8gPSB1dHhvU2VsZWN0aW9uLnN1YnNldC5zcGxpY2UoMCwgMSkucG9wKCk7XG5cbiAgICB1dHhvU2VsZWN0aW9uLnNlbGVjdGlvbi5wdXNoKHV0eG8pO1xuICAgIHV0eG9TZWxlY3Rpb24uYW1vdW50ID0gYWRkQW1vdW50cyhcbiAgICAgIHV0eG8ub3V0cHV0KCkuYW1vdW50KCksXG4gICAgICB1dHhvU2VsZWN0aW9uLmFtb3VudFxuICAgICk7XG5cbiAgICBsaW1pdC0tO1xuICB9IHdoaWxlIChcbiAgICAhaXNRdHlGdWxmaWxsZWQoXG4gICAgICBvdXRwdXRBbW91bnQsXG4gICAgICB1dHhvU2VsZWN0aW9uLmFtb3VudCxcbiAgICAgIG1pblVUeE9WYWx1ZSxcbiAgICAgIHV0eG9TZWxlY3Rpb24uc3Vic2V0Lmxlbmd0aCAtIDFcbiAgICApXG4gICk7XG5cbiAgLy8gUXVhbnRpdHkgaXMgbWV0LCByZXR1cm4gc3Vic2V0IGludG8gcmVtYWluaW5nIGxpc3QgYW5kIHJldHVybiBzZWxlY3Rpb25cbiAgdXR4b1NlbGVjdGlvbi5yZW1haW5pbmcgPSBbXG4gICAgLi4udXR4b1NlbGVjdGlvbi5yZW1haW5pbmcsXG4gICAgLi4udXR4b1NlbGVjdGlvbi5zdWJzZXQsXG4gIF07XG4gIHV0eG9TZWxlY3Rpb24uc3Vic2V0ID0gW107XG5cbiAgcmV0dXJuIHV0eG9TZWxlY3Rpb247XG59XG5cbi8qKlxuICogVHJ5IHRvIGltcHJvdmUgc2VsZWN0aW9uIGJ5IGluY3JlYXNpbmcgaW5wdXQgYW1vdW50IGluIFsyeCwzeF0gcmFuZ2UuXG4gKiBAcGFyYW0ge1VUeE9TZWxlY3Rpb259IHV0eG9TZWxlY3Rpb24gLSBUaGUgc2V0IG9mIHNlbGVjdGVkL2F2YWlsYWJsZSBpbnB1dHMuXG4gKiBAcGFyYW0ge1ZhbHVlfSBvdXRwdXRBbW91bnQgLSBTaW5nbGUgY29tcGlsZWQgb3V0cHV0IHF0eSByZXF1ZXN0ZWQgZm9yIHBheW1lbnQuXG4gKiBAcGFyYW0ge2ludH0gbGltaXQgLSBBIGxpbWl0IG9uIHRoZSBudW1iZXIgb2YgaW5wdXRzIHRoYXQgY2FuIGJlIHNlbGVjdGVkLlxuICogQHBhcmFtIHtJbXByb3ZlUmFuZ2V9IHJhbmdlIC0gSW1wcm92ZW1lbnQgcmFuZ2UgdGFyZ2V0IHZhbHVlc1xuICovXG5mdW5jdGlvbiBpbXByb3ZlKHV0eG9TZWxlY3Rpb24sIG91dHB1dEFtb3VudCwgbGltaXQsIHJhbmdlKSB7XG4gIGxldCBuYkZyZWVVVHhPID0gdXR4b1NlbGVjdGlvbi5zdWJzZXQubGVuZ3RoO1xuXG4gIGlmIChcbiAgICB1dHhvU2VsZWN0aW9uLmFtb3VudC5jb21wYXJlKHJhbmdlLmlkZWFsKSA+PSAwIHx8XG4gICAgbmJGcmVlVVR4TyA8PSAwIHx8XG4gICAgbGltaXQgPD0gMFxuICApIHtcbiAgICAvLyBSZXR1cm4gc3Vic2V0IGluIHJlbWFpbmluZ1xuICAgIHV0eG9TZWxlY3Rpb24ucmVtYWluaW5nID0gW1xuICAgICAgLi4udXR4b1NlbGVjdGlvbi5yZW1haW5pbmcsXG4gICAgICAuLi51dHhvU2VsZWN0aW9uLnN1YnNldCxcbiAgICBdO1xuICAgIHV0eG9TZWxlY3Rpb24uc3Vic2V0ID0gW107XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvKiogQHR5cGUge1RyYW5zYWN0aW9uVW5zcGVudE91dHB1dH0gdXR4byAqL1xuICBjb25zdCB1dHhvID0gdXR4b1NlbGVjdGlvbi5zdWJzZXRcbiAgICAuc3BsaWNlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5iRnJlZVVUeE8pLCAxKVxuICAgIC5wb3AoKTtcblxuICBjb25zdCBuZXdBbW91bnQgPSBMb2FkZXIuQ2FyZGFuby5WYWx1ZS5uZXcoXG4gICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fc3RyKCcwJylcbiAgKVxuICAgIC5jaGVja2VkX2FkZCh1dHhvLm91dHB1dCgpLmFtb3VudCgpKVxuICAgIC5jaGVja2VkX2FkZChvdXRwdXRBbW91bnQpO1xuXG4gIGlmIChcbiAgICBhYnMoZ2V0QW1vdW50VmFsdWUocmFuZ2UuaWRlYWwpIC0gZ2V0QW1vdW50VmFsdWUobmV3QW1vdW50KSkgPFxuICAgICAgYWJzKGdldEFtb3VudFZhbHVlKHJhbmdlLmlkZWFsKSAtIGdldEFtb3VudFZhbHVlKG91dHB1dEFtb3VudCkpICYmXG4gICAgbmV3QW1vdW50LmNvbXBhcmUocmFuZ2UubWF4aW11bSkgPD0gMFxuICApIHtcbiAgICB1dHhvU2VsZWN0aW9uLnNlbGVjdGlvbi5wdXNoKHV0eG8pO1xuICAgIHV0eG9TZWxlY3Rpb24uYW1vdW50ID0gYWRkQW1vdW50cyhcbiAgICAgIHV0eG8ub3V0cHV0KCkuYW1vdW50KCksXG4gICAgICB1dHhvU2VsZWN0aW9uLmFtb3VudFxuICAgICk7XG4gICAgbGltaXQtLTtcbiAgfSBlbHNlIHtcbiAgICB1dHhvU2VsZWN0aW9uLnJlbWFpbmluZy5wdXNoKHV0eG8pO1xuICB9XG5cbiAgcmV0dXJuIGltcHJvdmUodXR4b1NlbGVjdGlvbiwgb3V0cHV0QW1vdW50LCBsaW1pdCwgcmFuZ2UpO1xufVxuXG4vKipcbiAqIENvbXBpbGUgYWxsIHJlcXVpcmVkIG91dHB1dHMgdG8gYSBmbGF0IGFtb3VudHMgbGlzdFxuICogQHBhcmFtIHtUcmFuc2FjdGlvbk91dHB1dHN9IG91dHB1dHMgLSBUaGUgc2V0IG9mIG91dHB1dHMgcmVxdWVzdGVkIGZvciBwYXltZW50LlxuICogQHJldHVybiB7VmFsdWV9IC0gVGhlIGNvbXBpbGVkIHNldCBvZiBhbW91bnRzIHJlcXVlc3RlZCBmb3IgcGF5bWVudC5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VPdXRwdXRzQW1vdW50cyhvdXRwdXRzKSB7XG4gIGxldCBjb21waWxlZEFtb3VudExpc3QgPSBMb2FkZXIuQ2FyZGFuby5WYWx1ZS5uZXcoXG4gICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fc3RyKCcwJylcbiAgKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dHMubGVuKCk7IGkrKykge1xuICAgIGNvbXBpbGVkQW1vdW50TGlzdCA9IGFkZEFtb3VudHMoXG4gICAgICBvdXRwdXRzLmdldChpKS5hbW91bnQoKSxcbiAgICAgIGNvbXBpbGVkQW1vdW50TGlzdFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY29tcGlsZWRBbW91bnRMaXN0O1xufVxuXG4vKipcbiAqIEFkZCB1cCBhbiBBbW91bnRzIExpc3QgdmFsdWVzIHRvIGFub3RoZXIgQW1vdW50cyBMaXN0XG4gKiBAcGFyYW0ge1ZhbHVlfSBhbW91bnRzIC0gU2V0IG9mIGFtb3VudHMgdG8gYmUgYWRkZWQuXG4gKiBAcGFyYW0ge1ZhbHVlfSBjb21waWxlZEFtb3VudHMgLSBUaGUgY29tcGlsZWQgc2V0IG9mIGFtb3VudHMuXG4gKiBAcmV0dXJuIHtWYWx1ZX1cbiAqL1xuZnVuY3Rpb24gYWRkQW1vdW50cyhhbW91bnRzLCBjb21waWxlZEFtb3VudHMpIHtcbiAgcmV0dXJuIGNvbXBpbGVkQW1vdW50cy5jaGVja2VkX2FkZChhbW91bnRzKTtcbn1cblxuLyoqXG4gKiBTcGxpdCBhbW91bnRzIGNvbnRhaW5lZCBpbiBhIHNpbmdsZSB7VmFsdWV9IG9iamVjdCBpbiBzZXBhcmF0ZSB7VmFsdWV9IG9iamVjdHNcbiAqIEBwYXJhbSB7VmFsdWV9IGFtb3VudHMgLSBTZXQgb2YgYW1vdW50cyB0byBiZSBzcGxpdC5cbiAqIEB0aHJvd3MgTUlOX1VUWE9fRVJST1IgaWYgbG92ZWxhY2UgY2hhbmdlIGlzIHVuZGVyICdtaW5VVHhPVmFsdWUnIHBhcmFtZXRlci5cbiAqIEByZXR1cm4ge0Ftb3VudExpc3R9XG4gKi9cbmZ1bmN0aW9uIHNwbGl0QW1vdW50cyhhbW91bnRzKSB7XG4gIGxldCBzcGxpdEFtb3VudHMgPSBbXTtcblxuICBpZiAoYW1vdW50cy5tdWx0aWFzc2V0KCkpIHtcbiAgICBsZXQgbUEgPSBhbW91bnRzLm11bHRpYXNzZXQoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbUEua2V5cygpLmxlbigpOyBpKyspIHtcbiAgICAgIGxldCBzY3JpcHRIYXNoID0gbUEua2V5cygpLmdldChpKTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtQS5nZXQoc2NyaXB0SGFzaCkua2V5cygpLmxlbigpOyBqKyspIHtcbiAgICAgICAgbGV0IF9hc3NldHMgPSBMb2FkZXIuQ2FyZGFuby5Bc3NldHMubmV3KCk7XG4gICAgICAgIGxldCBhc3NldE5hbWUgPSBtQS5nZXQoc2NyaXB0SGFzaCkua2V5cygpLmdldChqKTtcblxuICAgICAgICBfYXNzZXRzLmluc2VydChcbiAgICAgICAgICBMb2FkZXIuQ2FyZGFuby5Bc3NldE5hbWUuZnJvbV9ieXRlcyhhc3NldE5hbWUudG9fYnl0ZXMoKSksXG4gICAgICAgICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fYnl0ZXMoXG4gICAgICAgICAgICBtQS5nZXQoc2NyaXB0SGFzaCkuZ2V0KGFzc2V0TmFtZSkudG9fYnl0ZXMoKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgX211bHRpYXNzZXQgPSBMb2FkZXIuQ2FyZGFuby5NdWx0aUFzc2V0Lm5ldygpO1xuICAgICAgICBfbXVsdGlhc3NldC5pbnNlcnQoXG4gICAgICAgICAgTG9hZGVyLkNhcmRhbm8uU2NyaXB0SGFzaC5mcm9tX2J5dGVzKHNjcmlwdEhhc2gudG9fYnl0ZXMoKSksXG4gICAgICAgICAgX2Fzc2V0c1xuICAgICAgICApO1xuICAgICAgICBsZXQgX3ZhbHVlID0gTG9hZGVyLkNhcmRhbm8uVmFsdWUubmV3KFxuICAgICAgICAgIExvYWRlci5DYXJkYW5vLkJpZ051bS5mcm9tX3N0cignMCcpXG4gICAgICAgICk7XG4gICAgICAgIF92YWx1ZS5zZXRfbXVsdGlhc3NldChfbXVsdGlhc3NldCk7XG5cbiAgICAgICAgc3BsaXRBbW91bnRzLnB1c2goX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBPcmRlciBhc3NldHMgYnkgcXR5IERFU0NcbiAgc3BsaXRBbW91bnRzID0gc29ydEFtb3VudExpc3Qoc3BsaXRBbW91bnRzLCAnREVTQycpO1xuXG4gIC8vIEluc3VyZSBsb3ZlbGFjZSBpcyBsYXN0IHRvIGFjY291bnQgZm9yIG1pbiBhZGEgcmVxdWlyZW1lbnRcbiAgc3BsaXRBbW91bnRzLnB1c2goXG4gICAgTG9hZGVyLkNhcmRhbm8uVmFsdWUubmV3KFxuICAgICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fYnl0ZXMoYW1vdW50cy5jb2luKCkudG9fYnl0ZXMoKSlcbiAgICApXG4gICk7XG5cbiAgcmV0dXJuIHNwbGl0QW1vdW50cztcbn1cblxuLyoqXG4gKiBTb3J0IGEgbWlzbWF0Y2hlZCBBbW91bnRMaXN0IEFTQy9ERVNDXG4gKiBAcGFyYW0ge0Ftb3VudExpc3R9IGFtb3VudExpc3QgLSBTZXQgb2YgbWlzbWF0Y2hlZCBhbW91bnRzIHRvIGJlIHNvcnRlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbc29ydE9yZGVyPUFTQ10gLSBPcmRlclxuICogQHJldHVybiB7QW1vdW50TGlzdH0gLSBUaGUgc29ydGVkIEFtb3VudExpc3RcbiAqL1xuZnVuY3Rpb24gc29ydEFtb3VudExpc3QoYW1vdW50TGlzdCwgc29ydE9yZGVyID0gJ0FTQycpIHtcbiAgcmV0dXJuIGFtb3VudExpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCBzb3J0SW50ID0gc29ydE9yZGVyID09PSAnREVTQycgPyBCaWdJbnQoLTEpIDogQmlnSW50KDEpO1xuICAgIHJldHVybiBOdW1iZXIoKGdldEFtb3VudFZhbHVlKGEpIC0gZ2V0QW1vdW50VmFsdWUoYikpICogc29ydEludCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybiBCaWdJbnQgYW1vdW50IHZhbHVlXG4gKiBAcGFyYW0gYW1vdW50XG4gKiBAcmV0dXJuIHtiaWdpbnR9XG4gKi9cbmZ1bmN0aW9uIGdldEFtb3VudFZhbHVlKGFtb3VudCkge1xuICBsZXQgdmFsID0gQmlnSW50KDApO1xuICBsZXQgbG92ZWxhY2UgPSBCaWdJbnQoYW1vdW50LmNvaW4oKS50b19zdHIoKSk7XG5cbiAgaWYgKGxvdmVsYWNlID4gMCkge1xuICAgIHZhbCA9IGxvdmVsYWNlO1xuICB9IGVsc2UgaWYgKGFtb3VudC5tdWx0aWFzc2V0KCkgJiYgYW1vdW50Lm11bHRpYXNzZXQoKS5sZW4oKSA+IDApIHtcbiAgICBsZXQgc2NyaXB0SGFzaCA9IGFtb3VudC5tdWx0aWFzc2V0KCkua2V5cygpLmdldCgwKTtcbiAgICBsZXQgYXNzZXROYW1lID0gYW1vdW50Lm11bHRpYXNzZXQoKS5nZXQoc2NyaXB0SGFzaCkua2V5cygpLmdldCgwKTtcbiAgICB2YWwgPSBCaWdJbnQoYW1vdW50Lm11bHRpYXNzZXQoKS5nZXQoc2NyaXB0SGFzaCkuZ2V0KGFzc2V0TmFtZSkudG9fc3RyKCkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiBOYXJyb3cgZG93biByZW1haW5pbmcgVVR4TyBzZXQgaW4gY2FzZSBvZiBuYXRpdmUgdG9rZW4sIHVzZSBmdWxsIHNldCBmb3IgbG92ZWxhY2VcbiAqIEBwYXJhbSB7VVR4T1NlbGVjdGlvbn0gdXR4b1NlbGVjdGlvbiAtIFRoZSBzZXQgb2Ygc2VsZWN0ZWQvYXZhaWxhYmxlIGlucHV0cy5cbiAqIEBwYXJhbSB7VmFsdWV9IG91dHB1dCAtIFNpbmdsZSBjb21waWxlZCBvdXRwdXQgcXR5IHJlcXVlc3RlZCBmb3IgcGF5bWVudC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3ViU2V0KHV0eG9TZWxlY3Rpb24sIG91dHB1dCkge1xuICBpZiAoQmlnSW50KG91dHB1dC5jb2luKCkudG9fc3RyKCkpIDwgQmlnSW50KDEpKSB7XG4gICAgdXR4b1NlbGVjdGlvbi5yZW1haW5pbmcuZm9yRWFjaCgodXR4bywgaW5kZXgpID0+IHtcbiAgICAgIGlmIChvdXRwdXQuY29tcGFyZSh1dHhvLm91dHB1dCgpLmFtb3VudCgpKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHV0eG9TZWxlY3Rpb24uc3Vic2V0LnB1c2goXG4gICAgICAgICAgdXR4b1NlbGVjdGlvbi5yZW1haW5pbmcuc3BsaWNlKGluZGV4LCAxKS5wb3AoKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHV0eG9TZWxlY3Rpb24uc3Vic2V0ID0gdXR4b1NlbGVjdGlvbi5yZW1haW5pbmcuc3BsaWNlKFxuICAgICAgMCxcbiAgICAgIHV0eG9TZWxlY3Rpb24ucmVtYWluaW5nLmxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBJcyBRdWFudGl0eSBGdWxmaWxsZWQgQ29uZGl0aW9uIC0gSGFuZGxlICdtaW5VVHhPVmFsdWUnIHByb3RvY29sIHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7VmFsdWV9IG91dHB1dEFtb3VudCAtIFNpbmdsZSBjb21waWxlZCBvdXRwdXQgcXR5IHJlcXVlc3RlZCBmb3IgcGF5bWVudC5cbiAqIEBwYXJhbSB7VmFsdWV9IGN1bXVsYXRlZEFtb3VudCAtIFNpbmdsZSBjb21waWxlZCBhY2N1bXVsYXRlZCBVVHhPIHF0eS5cbiAqIEBwYXJhbSB7aW50fSBtaW5VVHhPVmFsdWUgLSBOZXR3b3JrIHByb3RvY29sICdtaW5VVHhPVmFsdWUnIGN1cnJlbnQgdmFsdWUuXG4gKiBAcGFyYW0ge2ludH0gbmJGcmVlVVR4TyAtIE51bWJlciBvZiBmcmVlIFVUeE8gYXZhaWxhYmxlLlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNRdHlGdWxmaWxsZWQoXG4gIG91dHB1dEFtb3VudCxcbiAgY3VtdWxhdGVkQW1vdW50LFxuICBtaW5VVHhPVmFsdWUsXG4gIG5iRnJlZVVUeE9cbikge1xuICBsZXQgYW1vdW50ID0gb3V0cHV0QW1vdW50O1xuXG4gIGlmIChtaW5VVHhPVmFsdWUgJiYgQmlnSW50KG91dHB1dEFtb3VudC5jb2luKCkudG9fc3RyKCkpID4gMCkge1xuICAgIGxldCBtaW5BbW91bnQgPSBMb2FkZXIuQ2FyZGFuby5WYWx1ZS5uZXcoXG4gICAgICBMb2FkZXIuQ2FyZGFuby5taW5fYWRhX3JlcXVpcmVkKFxuICAgICAgICBjdW11bGF0ZWRBbW91bnQsXG4gICAgICAgIExvYWRlci5DYXJkYW5vLkJpZ051bS5mcm9tX3N0cihtaW5VVHhPVmFsdWUudG9TdHJpbmcoKSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgLy8gTG92ZWxhY2UgbWluIGFtb3VudCB0byBjb3ZlciBhc3NldHMgYW5kIG51bWJlciBvZiBvdXRwdXQgbmVlZCB0byBiZSBtZXRcbiAgICBpZiAoY3VtdWxhdGVkQW1vdW50LmNvbXBhcmUobWluQW1vdW50KSA8IDApIHJldHVybiBmYWxzZTtcblxuICAgIC8vIElmIHJlcXVlc3RlZCBMb3ZlbGFjZSBsb3dlciB0aGFuIG1pbkFtb3VudCwgcGxhbiBmb3IgY2hhbmdlXG4gICAgaWYgKG91dHB1dEFtb3VudC5jb21wYXJlKG1pbkFtb3VudCkgPCAwKSB7XG4gICAgICBhbW91bnQgPSBtaW5BbW91bnQuY2hlY2tlZF9hZGQoXG4gICAgICAgIExvYWRlci5DYXJkYW5vLlZhbHVlLm5ldyhcbiAgICAgICAgICBMb2FkZXIuQ2FyZGFuby5CaWdOdW0uZnJvbV9zdHIocHJvdG9jb2xQYXJhbWV0ZXJzLm1pblVUeE8pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVHJ5IGNvdmVyaW5nIHRoZSBtYXggZmVlc1xuICAgIGlmIChuYkZyZWVVVHhPID4gMCkge1xuICAgICAgbGV0IG1heEZlZSA9XG4gICAgICAgIEJpZ0ludChwcm90b2NvbFBhcmFtZXRlcnMubWluRmVlQSkgKlxuICAgICAgICAgIEJpZ0ludChwcm90b2NvbFBhcmFtZXRlcnMubWF4VHhTaXplKSArXG4gICAgICAgIEJpZ0ludChwcm90b2NvbFBhcmFtZXRlcnMubWluRmVlQik7XG5cbiAgICAgIG1heEZlZSA9IExvYWRlci5DYXJkYW5vLlZhbHVlLm5ldyhcbiAgICAgICAgTG9hZGVyLkNhcmRhbm8uQmlnTnVtLmZyb21fc3RyKG1heEZlZS50b1N0cmluZygpKVxuICAgICAgKTtcblxuICAgICAgYW1vdW50ID0gYW1vdW50LmNoZWNrZWRfYWRkKG1heEZlZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1bXVsYXRlZEFtb3VudC5jb21wYXJlKGFtb3VudCkgPj0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBkZWVwIGNvcHkgb2YgVVR4T1NlbGVjdGlvblxuICogQHBhcmFtIHtVVHhPU2VsZWN0aW9ufSB1dHhvU2VsZWN0aW9uXG4gKiBAcmV0dXJuIHtVVHhPU2VsZWN0aW9ufSBDbG9uZSAtIERlZXAgY29weVxuICovXG5mdW5jdGlvbiBjbG9uZVVUeE9TZWxlY3Rpb24odXR4b1NlbGVjdGlvbikge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdGlvbjogY2xvbmVVVHhPTGlzdCh1dHhvU2VsZWN0aW9uLnNlbGVjdGlvbiksXG4gICAgcmVtYWluaW5nOiBjbG9uZVVUeE9MaXN0KHV0eG9TZWxlY3Rpb24ucmVtYWluaW5nKSxcbiAgICBzdWJzZXQ6IGNsb25lVVR4T0xpc3QodXR4b1NlbGVjdGlvbi5zdWJzZXQpLFxuICAgIGFtb3VudDogY2xvbmVWYWx1ZSh1dHhvU2VsZWN0aW9uLmFtb3VudCksXG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJuIGEgZGVlcCBjb3B5IG9mIGFuIFVUeE8gTGlzdFxuICogQHBhcmFtIHtVVHhPTGlzdH0gdXR4b0xpc3RcbiAqIEByZXR1cm4ge1VUeE9MaXN0fSBDb25lIC0gRGVlcCBjb3B5XG4gKi9cbmNvbnN0IGNsb25lVVR4T0xpc3QgPSAodXR4b0xpc3QpID0+XG4gIHV0eG9MaXN0Lm1hcCgodXR4bykgPT5cbiAgICBMb2FkZXIuQ2FyZGFuby5UcmFuc2FjdGlvblVuc3BlbnRPdXRwdXQuZnJvbV9ieXRlcyh1dHhvLnRvX2J5dGVzKCkpXG4gICk7XG5cbi8qKlxuICogUmV0dXJuIGEgZGVlcCBjb3B5IG9mIGEgVmFsdWUgb2JqZWN0XG4gKiBAcGFyYW0ge1ZhbHVlfSB2YWx1ZVxuICogQHJldHVybiB7VmFsdWV9IENvbmUgLSBEZWVwIGNvcHlcbiAqL1xuY29uc3QgY2xvbmVWYWx1ZSA9ICh2YWx1ZSkgPT4gTG9hZGVyLkNhcmRhbm8uVmFsdWUuZnJvbV9ieXRlcyh2YWx1ZS50b19ieXRlcygpKTtcblxuLy8gSGVscGVyXG5mdW5jdGlvbiBhYnMoYmlnKSB7XG4gIHJldHVybiBiaWcgPCAwID8gYmlnICogQmlnSW50KC0xKSA6IGJpZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29pblNlbGVjdGlvbjtcbiJdLCJuYW1lcyI6WyJUcmFuc2FjdGlvblVuc3BlbnRPdXRwdXQiLCJUcmFuc2FjdGlvbk91dHB1dHMiLCJWYWx1ZSIsIlMiLCJMb2FkZXIiLCJDYXJkYW5vIiwicHJvdG9jb2xQYXJhbWV0ZXJzIiwiQ29pblNlbGVjdGlvbiIsInNldFByb3RvY29sUGFyYW1ldGVycyIsIm1pblVUeE8iLCJtaW5GZWVBIiwibWluRmVlQiIsIm1heFR4U2l6ZSIsInJhbmRvbUltcHJvdmUiLCJpbnB1dHMiLCJvdXRwdXRzIiwibGltaXQiLCJFcnJvciIsIl9taW5VVHhPVmFsdWUiLCJCaWdJbnQiLCJsZW4iLCJ1dHhvU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwicmVtYWluaW5nIiwic3Vic2V0IiwiYW1vdW50IiwiQmlnTnVtIiwiZnJvbV9zdHIiLCJtZXJnZWRPdXRwdXRzQW1vdW50cyIsIm1lcmdlT3V0cHV0c0Ftb3VudHMiLCJzcGxpdE91dHB1dHNBbW91bnRzIiwic3BsaXRBbW91bnRzIiwiZm9yRWFjaCIsIm91dHB1dCIsImNyZWF0ZVN1YlNldCIsInJhbmRvbVNlbGVjdCIsImNsb25lVVR4T1NlbGVjdGlvbiIsImxlbmd0aCIsImUiLCJtZXNzYWdlIiwiZGVzY1NlbGVjdCIsInNvcnRBbW91bnRMaXN0IiwicmFuZ2UiLCJpZGVhbCIsImNoZWNrZWRfYWRkIiwibWF4aW11bSIsImltcHJvdmUiLCJpbnB1dCIsImNoYW5nZSIsImNoZWNrZWRfc3ViIiwib3V0cHV0QW1vdW50IiwibWluVVR4T1ZhbHVlIiwibmJGcmVlVVR4TyIsImlzUXR5RnVsZmlsbGVkIiwidXR4byIsInNwbGljZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBvcCIsInB1c2giLCJhZGRBbW91bnRzIiwic29ydCIsInV0eG9BIiwidXR4b0IiLCJjb21wYXJlIiwibmV3QW1vdW50IiwiYWJzIiwiZ2V0QW1vdW50VmFsdWUiLCJjb21waWxlZEFtb3VudExpc3QiLCJpIiwiZ2V0IiwiYW1vdW50cyIsImNvbXBpbGVkQW1vdW50cyIsIm11bHRpYXNzZXQiLCJtQSIsImtleXMiLCJzY3JpcHRIYXNoIiwiaiIsIl9hc3NldHMiLCJBc3NldHMiLCJhc3NldE5hbWUiLCJpbnNlcnQiLCJBc3NldE5hbWUiLCJmcm9tX2J5dGVzIiwidG9fYnl0ZXMiLCJfbXVsdGlhc3NldCIsIk11bHRpQXNzZXQiLCJTY3JpcHRIYXNoIiwiX3ZhbHVlIiwic2V0X211bHRpYXNzZXQiLCJjb2luIiwiYW1vdW50TGlzdCIsInNvcnRPcmRlciIsImEiLCJiIiwic29ydEludCIsIk51bWJlciIsInZhbCIsImxvdmVsYWNlIiwidG9fc3RyIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJjdW11bGF0ZWRBbW91bnQiLCJtaW5BbW91bnQiLCJtaW5fYWRhX3JlcXVpcmVkIiwidG9TdHJpbmciLCJtYXhGZWUiLCJjbG9uZVVUeE9MaXN0IiwiY2xvbmVWYWx1ZSIsInV0eG9MaXN0IiwibWFwIiwidmFsdWUiLCJiaWciXSwic291cmNlUm9vdCI6IiJ9