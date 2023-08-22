import _defineProperty from '@babel/runtime/helpers/defineProperty';
import React, { Component, Fragment, useState } from 'react';
import { Delete, Tab, Edit, Add, MonetizationOn } from '@material-ui/icons';
import { withModulesManager, ControlledField, PublishedComponent, AmountInput, TextInput, formatMessage, formatPageQueryWithCount, graphql, formatPageQuery, formatMutation, formatGQLString, formatJsonField, FormattedMessage, Searcher, formatMessageWithValues, journalize, formatDateFromISO, formatAmount, withHistory, historyPush, NumberInput, FormPanel, Helmet, ProgressOrError, Form, coreConfirm, sort, formatSorter, withTooltip, Table, PagedDataHandler, ConstantBasedPicker, dispatchMutationResp, dispatchMutationErr, dispatchMutationReq, formatServerError, parseData, formatGraphQLError, pageInfo } from '@openimis/fe-core';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { Grid, FormControlLabel, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip, IconButton, Paper, Typography, Divider } from '@material-ui/core';
import _debounce from 'lodash/debounce';
import _ from 'lodash';
import 'lodash-uuid';
import ReplayIcon from '@material-ui/icons/Replay';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _extends from '@babel/runtime/helpers/extends';

function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$7 = function styles(theme) {
  return {
    dialogTitle: theme.dialog.title,
    dialogContent: theme.dialog.content,
    form: {
      padding: 0
    },
    item: {
      padding: theme.spacing(1)
    },
    paperDivider: theme.paper.divider
  };
};
var ContributionFilter = /*#__PURE__*/function (_Component) {
  _inherits(ContributionFilter, _Component);
  var _super = _createSuper$b(ContributionFilter);
  function ContributionFilter() {
    var _this;
    _classCallCheck(this, ContributionFilter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      showHistory: false
    });
    _defineProperty(_assertThisInitialized(_this), "debouncedOnChangeFilter", _debounce(_this.props.onChangeFilters, _this.props.modulesManager.getConf("fe-contribution", "debounceTime", 800)));
    _defineProperty(_assertThisInitialized(_this), "_filterValue", function (k) {
      var filters = _this.props.filters;
      return !!filters && !!filters[k] ? filters[k].value : null;
    });
    _defineProperty(_assertThisInitialized(_this), "_onChangeShowHistory", function () {
      var filters = [{
        id: "showHistory",
        value: !_this.state.showHistory,
        filter: "showHistory: ".concat(!_this.state.showHistory)
      }];
      _this.props.onChangeFilters(filters);
      _this.setState(function (state) {
        return {
          showHistory: !state.showHistory
        };
      });
    });
    return _this;
  }
  _createClass(ContributionFilter, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.filters["showHistory"] !== this.props.filters["showHistory"] && !!this.props.filters["showHistory"] && this.state.showHistory !== this.props.filters["showHistory"]["value"]) {
        this.setState(function (state, props) {
          return {
            showHistory: props.filters["showHistory"]["value"]
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        filters = _this$props.filters,
        onChangeFilters = _this$props.onChangeFilters,
        intl = _this$props.intl;
      return /*#__PURE__*/React.createElement("section", {
        className: classes.form
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.location",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 12
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "location.DetailedLocationFilter",
          withNull: true,
          filters: filters,
          onChangeFilters: onChangeFilters,
          anchor: "parentLocation"
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.payDate",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4
        }, /*#__PURE__*/React.createElement(Grid, {
          container: true
        }, /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 6,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "core.DatePicker",
          value: this._filterValue("payDateFrom"),
          module: "contribution",
          label: "contribution.payDateFrom",
          onChange: function onChange(d) {
            return onChangeFilters([{
              id: "payDateFrom",
              value: d,
              filter: "payDate_Gte: \"".concat(d, "\"")
            }]);
          }
        })), /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 6,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "core.DatePicker",
          value: this._filterValue("payDateTo"),
          module: "contribution",
          label: "contribution.payDateTo",
          onChange: function onChange(d) {
            return onChangeFilters([{
              id: "payDateTo",
              value: d,
              filter: "payDate_Lte: \"".concat(d, "\"")
            }]);
          }
        }))))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.payer",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "payer.PayerPicker",
          withNull: true,
          value: this._filterValue("payer"),
          onChange: function onChange(v) {
            return onChangeFilters([{
              id: "payer",
              value: v,
              filter: "payer_Id: \"".concat(v && v.id ? v.id : null, "\"")
            }]);
          }
        }))
      }), ["amount_Gte", "amount_Lte"].map(function (a) {
        return /*#__PURE__*/React.createElement(ControlledField, {
          module: "contribution",
          id: "ContributionFilter.amountUnder",
          key: a,
          field: /*#__PURE__*/React.createElement(Grid, {
            item: true,
            xs: 2,
            className: classes.item
          }, /*#__PURE__*/React.createElement(AmountInput, {
            module: "contribution",
            label: "contribution.".concat(a),
            value: filters[a] && filters[a]['value'],
            onChange: function onChange(v) {
              return _this2.debouncedOnChangeFilter([{
                id: a,
                value: !v ? null : v,
                filter: !!v ? "".concat(a, ": ").concat(v) : null
              }]);
            }
          }))
        });
      })), /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.payType",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "contribution.PremiumPaymentTypePicker",
          withNull: true,
          value: this._filterValue("payType"),
          onChange: function onChange(v) {
            return onChangeFilters([{
              id: "payType",
              value: v,
              filter: !!v ? "payType: \"".concat(v, "\"") : null
            }]);
          }
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "contribution.category",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(PublishedComponent, {
          pubRef: "contribution.PremiumCategoryPicker",
          withNull: true,
          value: this._filterValue("isPhotoFee"),
          onChange: function onChange(c) {
            return onChangeFilters([{
              id: "isPhotoFee",
              value: c,
              filter: "isPhotoFee: ".concat(c !== 'contribution')
            }]);
          }
        }))
      }), /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.receipt",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 4,
          className: classes.item
        }, /*#__PURE__*/React.createElement(TextInput, {
          module: "contribution",
          label: "contribution.receipt",
          name: "receipt",
          value: this._filterValue("receipt"),
          onChange: function onChange(v) {
            return _this2.debouncedOnChangeFilter([{
              id: "receipt",
              value: v,
              filter: "receipt_Icontains: \"".concat(v, "\"")
            }]);
          }
        }))
      })), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        justify: "flex-end"
      }, /*#__PURE__*/React.createElement(ControlledField, {
        module: "contribution",
        id: "ContributionFilter.showHistory",
        field: /*#__PURE__*/React.createElement(Grid, {
          item: true,
          xs: 2,
          className: classes.item
        }, /*#__PURE__*/React.createElement(FormControlLabel, {
          control: /*#__PURE__*/React.createElement(Checkbox, {
            color: "primary",
            checked: this.state.showHistory,
            onChange: function onChange(e) {
              return _this2._onChangeShowHistory();
            }
          }),
          label: formatMessage(intl, "contribution", "showHistory")
        }))
      })));
    }
  }]);
  return ContributionFilter;
}(Component);
var ContributionFilter$1 = withModulesManager(injectIntl(withTheme(withStyles(styles$7)(ContributionFilter))));

var CONTRIBUTION_FULL_PROJECTION = function CONTRIBUTION_FULL_PROJECTION(mm) {
  return ["id", "uuid", "payDate", "amount", "payType", "receipt", "isPhotoFee", "clientMutationId", "payer".concat(mm.getProjection("payer.PayerPicker.projection")), "policy".concat(mm.getProjection("policy.PolicyPicker.projection")), "networkOperator", "paymentNumber"];
};
function fetchPoliciesPremiums(mm, filters) {
  var payload = formatPageQueryWithCount("premiumsByPolicies", filters, ["id", "uuid", "payDate", "payer".concat(mm.getProjection("payer.PayerPicker.projection")), "amount", "payType", "receipt", "isPhotoFee"]);
  return graphql(payload, 'CONTRIBUTION_POLICES_PREMIUMS');
}
function fetchContributionsSummaries(mm, filters) {
  var projections = ["id", "uuid", "payDate", "amount", "payType", "receipt", "isPhotoFee", "clientMutationId", "validityTo", "payer".concat(mm.getProjection("payer.PayerPicker.projection"))];
  var payload = formatPageQueryWithCount("premiums", filters, projections);
  return graphql(payload, 'CONTRIBUTION_CONTRIBUTIONS');
}
function selectPremium(premium) {
  return function (dispatch) {
    dispatch({
      type: 'CONTRIBUTION_PREMIUM',
      payload: premium
    });
  };
}
function formatContributionGQL(mm, contribution) {
  var req = "\n    ".concat(contribution.uuid !== undefined && contribution.uuid !== null ? "uuid: \"".concat(contribution.uuid, "\"") : '', "\n    ").concat(!!contribution.receipt ? "receipt: \"".concat(formatGQLString(contribution.receipt), "\"") : "", "\n    ").concat(!!contribution.payDate ? "payDate: \"".concat(contribution.payDate, "\"") : "", "\n    ").concat(!!contribution.payType ? "payType: \"".concat(contribution.payType, "\"") : "", "\n    ", "isPhotoFee: ".concat(contribution.isPhotoFee), "\n    ").concat(!!contribution.action ? "action: \"".concat(contribution.action, "\"") : "", "\n    ").concat(!!contribution.amount ? "amount: \"".concat(contribution.amount, "\"") : "", "\n    ").concat(!!contribution.payer ? "payerUuid: \"".concat(contribution.payer.uuid, "\"") : "", "\n    ").concat(!!contribution.jsonExt ? "jsonExt: ".concat(formatJsonField(contribution.jsonExt)) : "", "\n    ").concat(!!contribution.policy ? "policyUuid: \"".concat(formatGQLString(contribution.policy.uuid), "\"") : "", "\n    ").concat(!!contribution.networkOperator ? "networkOperator: \"".concat(contribution.networkOperator, "\"") : "", "\n    ").concat(!!contribution.paymentNumber ? "paymentNumber: \"".concat(contribution.paymentNumber, "\"") : "", "\n  ");
  return req;
}
function fetchPolicySummary(mm, policyUuid) {
  var filters = [];
  if (!!policyUuid) {
    filters.push("uuid: \"".concat(policyUuid, "\""));
  }
  var payload = formatPageQuery("policies", filters, ["id", "uuid", "startDate", "product{name}", "expiryDate", "value"]);
  return graphql(payload, 'CONTRIBUTION_POLICY_SUMMARY');
}
function fetchContribution(mm, contributionUuid, clientMutationId) {
  var filters = [];
  if (!!contributionUuid) {
    filters.push("uuid: \"".concat(contributionUuid, "\""));
  } else if (!!clientMutationId) {
    filters.push("clientMutationId: \"".concat(clientMutationId, "\""));
  }
  var payload = formatPageQuery("premiums", filters, CONTRIBUTION_FULL_PROJECTION(mm));
  return graphql(payload, 'CONTRIBUTION_OVERVIEW', {
    clientMutationId: !contributionUuid && clientMutationId
  });
}
function newContribution() {
  return function (dispatch) {
    dispatch({
      type: 'CONTRIBUTION_NEW'
    });
  };
}
function createContribution(mm, contribution, clientMutationLabel) {
  var mutation = formatMutation("createPremium", formatContributionGQL(mm, contribution), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ['CONTRIBUTION_MUTATION_REQ', 'CONTRIBUTION_CREATE_RESP', 'CONTRIBUTION_MUTATION_ERR'], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime
  });
}
function updateContribution(mm, contribution, clientMutationLabel) {
  var mutation = formatMutation("updatePremium", formatContributionGQL(mm, contribution), clientMutationLabel);
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ['CONTRIBUTION_MUTATION_REQ', 'CONTRIBUTION_UPDATE_RESP', 'CONTRIBUTION_MUTATION_ERR'], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime,
    contributionUuid: contribution.uuid
  });
}
function deleteContribution(mm, contribution, clientMutationLabel) {
  var mutation = formatMutation("deletePremium", "uuids: [\"".concat(contribution.uuid, "\"]"), clientMutationLabel);
  contribution.clientMutationId = mutation.clientMutationId;
  var requestedDateTime = new Date();
  return graphql(mutation.payload, ['CONTRIBUTION_MUTATION_REQ', 'CONTRIBUTION_DELETE_RESP', 'CONTRIBUTION_MUTATION_ERR'], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime,
    contributionUuid: contribution.uuid
  });
}

var RIGHT_CONTRIBUTION = 101301; // supposed to be 101300 ... but in practice
var RIGHT_CONTRIBUTION_ADD = 101302;
var RIGHT_CONTRIBUTION_EDIT = 101303;
var RIGHT_CONTRIBUTION_DELETE = 101304;
var PREMIUM_PAYMENT_TYPES = ["C", "B", "M"];
var PREMIUM_CATEGORIES = ["contribution", "photoFee"];
var PAYMENT_OPERATORS = ["O", "M"];

function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$6 = function styles(theme) {
  return {
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton
  };
};
var DeleteContributionDialog = /*#__PURE__*/function (_Component) {
  _inherits(DeleteContributionDialog, _Component);
  var _super = _createSuper$a(DeleteContributionDialog);
  function DeleteContributionDialog() {
    _classCallCheck(this, DeleteContributionDialog);
    return _super.apply(this, arguments);
  }
  _createClass(DeleteContributionDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        contribution = _this$props.contribution,
        onCancel = _this$props.onCancel,
        onConfirm = _this$props.onConfirm;
      return /*#__PURE__*/React.createElement(Dialog, {
        open: !!contribution,
        onClose: onCancel
      }, /*#__PURE__*/React.createElement(DialogTitle, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        module: "contribution",
        id: "deleteContributionDialog.title"
      })), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, /*#__PURE__*/React.createElement(FormattedMessage, {
        module: "contribution",
        id: "deleteContributionDialog.message"
      }))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(e) {
          return onConfirm();
        },
        className: classes.primaryButton,
        autoFocus: true
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        module: "contribution",
        id: "deleteContributionDialog.yes.button"
      })), /*#__PURE__*/React.createElement(Button, {
        onClick: onCancel,
        className: classes.secondaryButton
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        module: "core",
        id: "cancel"
      }))));
    }
  }]);
  return DeleteContributionDialog;
}(Component);
var DeleteContributionDialog$1 = injectIntl(withTheme(withStyles(styles$6)(DeleteContributionDialog)));

function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FAMILY_SEARCHER_CONTRIBUTION_KEY = "contribution.ContributionSearcher";
var ContributionSearcher = /*#__PURE__*/function (_Component) {
  _inherits(ContributionSearcher, _Component);
  var _super = _createSuper$9(ContributionSearcher);
  function ContributionSearcher(props) {
    var _this;
    _classCallCheck(this, ContributionSearcher);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "state", {
      deleteContribution: null,
      reset: 0
    });
    _defineProperty(_assertThisInitialized(_this), "fetch", function (prms) {
      _this.props.fetchContributionsSummaries(_this.props.modulesManager, prms);
    });
    _defineProperty(_assertThisInitialized(_this), "rowIdentifier", function (r) {
      return r.uuid;
    });
    _defineProperty(_assertThisInitialized(_this), "filtersToQueryParams", function (state) {
      var prms = Object.keys(state.filters).filter(function (contrib) {
        return !!state.filters[contrib]['filter'];
      }).map(function (contrib) {
        return state.filters[contrib]['filter'];
      });
      prms.push("first: ".concat(state.pageSize));
      if (!!state.afterCursor) {
        prms.push("after: \"".concat(state.afterCursor, "\""));
      }
      if (!!state.beforeCursor) {
        prms.push("before: \"".concat(state.beforeCursor, "\""));
      }
      if (!!state.orderBy) {
        prms.push("orderBy: [\"".concat(state.orderBy, "\"]"));
      }
      return prms;
    });
    _defineProperty(_assertThisInitialized(_this), "headers", function (filters) {
      var h = ["contribution.payDate", "contribution.payer", "contribution.amount", "contribution.payType", "contribution.receipt", "contribution.category", "contribution.openNewTabHead"];
      return h;
    });
    _defineProperty(_assertThisInitialized(_this), "sorts", function (filters) {
      var results = [['payDate', true], ['payer', true], ['amount', true], ['payType', true], ['receipt', true], ['isPhotoFee', true]];
      return results;
    });
    _defineProperty(_assertThisInitialized(_this), "deleteContribution", function () {
      var contribution = _this.state.deleteContribution;
      _this.setState({
        deleteContribution: null
      }, function (e) {
        _this.props.deleteContribution(_this.props.modulesManager, contribution, formatMessage(_this.props.intl, "contribution", "deleteContributionDialog.title"));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "confirmDelete", function (deleteContribution) {
      _this.setState({
        deleteContribution: deleteContribution
      });
    });
    _defineProperty(_assertThisInitialized(_this), "deletePremiumAction", function (i) {
      return !!i.validityTo || !!i.clientMutationId ? null : /*#__PURE__*/React.createElement(Tooltip, {
        title: formatMessage(_this.props.intl, "contribution", "deletePremium.tooltip")
      }, /*#__PURE__*/React.createElement(IconButton, {
        onClick: function onClick() {
          return _this.confirmDelete(i);
        }
      }, /*#__PURE__*/React.createElement(Delete, null)));
    });
    _defineProperty(_assertThisInitialized(_this), "itemFormatters", function () {
      var formatters = [function (c) {
        return formatDateFromISO(_this.props.modulesManager, _this.props.intl, c.payDate);
      }, function (c) {
        var _c$payer$name, _c$payer;
        return (_c$payer$name = (_c$payer = c.payer) === null || _c$payer === void 0 ? void 0 : _c$payer.name) !== null && _c$payer$name !== void 0 ? _c$payer$name : "";
      }, function (c) {
        return formatAmount(_this.props.intl, c.amount);
      }, function (c) {
        return /*#__PURE__*/React.createElement(PublishedComponent, {
          readOnly: true,
          pubRef: "contribution.PremiumPaymentTypePicker",
          withLabel: false,
          value: c.payType
        });
      }, function (c) {
        return c.receipt;
      }, function (c) {
        return formatMessage(_this.props.intl, "contribution", "contribution.category.".concat(!!c.isPhotoFee ? "photoFee" : "contribution"));
      }, function (c) {
        return /*#__PURE__*/React.createElement(Tooltip, {
          title: formatMessage(_this.props.intl, "contribution", "contribution.openNewTab")
        }, /*#__PURE__*/React.createElement(IconButton, {
          onClick: function onClick(e) {
            return _this.props.onDoubleClick(c, true);
          }
        }, " ", /*#__PURE__*/React.createElement(Tab, null)));
      }];
      if (!!_this.props.rights.includes(RIGHT_CONTRIBUTION_DELETE)) {
        formatters.push(_this.deletePremiumAction);
      }
      return formatters;
    });
    _defineProperty(_assertThisInitialized(_this), "rowDisabled", function (selection, i) {
      return !!i.validityTo;
    });
    _defineProperty(_assertThisInitialized(_this), "rowLocked", function (selection, i) {
      return !!i.clientMutationId;
    });
    _this.rowsPerPageOptions = [10, 20, 50, 100];
    _this.defaultPageSize = 10;
    _this.locationLevels = 4;
    return _this;
  }
  _createClass(ContributionSearcher, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
        this.setState({
          reset: this.state.reset + 1
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        intl = _this$props.intl,
        contributions = _this$props.contributions,
        contributionsPageInfo = _this$props.contributionsPageInfo,
        fetchingContributions = _this$props.fetchingContributions,
        fetchedContributions = _this$props.fetchedContributions,
        errorContributions = _this$props.errorContributions,
        filterPaneContributionsKey = _this$props.filterPaneContributionsKey,
        cacheFiltersKey = _this$props.cacheFiltersKey,
        _onDoubleClick = _this$props.onDoubleClick;
      var count = contributionsPageInfo.totalCount;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(DeleteContributionDialog$1, {
        contribution: this.state.deleteContribution,
        onConfirm: this.deleteContribution,
        onCancel: function onCancel(e) {
          return _this2.setState({
            deleteContribution: null
          });
        }
      }), /*#__PURE__*/React.createElement(Searcher, {
        module: "contribution",
        cacheFiltersKey: cacheFiltersKey,
        FilterPane: ContributionFilter$1,
        filterPaneContributionsKey: filterPaneContributionsKey,
        items: contributions,
        itemsPageInfo: contributionsPageInfo,
        fetchingItems: fetchingContributions,
        fetchedItems: fetchedContributions,
        errorItems: errorContributions,
        contributionKey: FAMILY_SEARCHER_CONTRIBUTION_KEY,
        tableTitle: formatMessageWithValues(intl, "contribution", "contributionSummaries", {
          count: count
        }),
        rowsPerPageOptions: this.rowsPerPageOptions,
        defaultPageSize: this.defaultPageSize,
        fetch: this.fetch,
        rowIdentifier: this.rowIdentifier,
        filtersToQueryParams: this.filtersToQueryParams,
        defaultOrderBy: "-payDate",
        headers: this.headers,
        itemFormatters: this.itemFormatters,
        sorts: this.sorts,
        rowDisabled: this.rowDisabled,
        rowLocked: this.rowLocked,
        onDoubleClick: function onDoubleClick(c) {
          return !c.clientMutationId && _onDoubleClick(c);
        },
        reset: this.state.reset
      }));
    }
  }]);
  return ContributionSearcher;
}(Component);
var mapStateToProps$5 = function mapStateToProps(state) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    contributions: state.contribution.contributions,
    contributionsPageInfo: state.contribution.contributionsPageInfo,
    fetchingContributions: state.contribution.fetchingContributions,
    fetchedContributions: state.contribution.fetchedContributions,
    errorContributions: state.contribution.errorContributions,
    submittingMutation: state.contribution.submittingMutation,
    mutation: state.contribution.mutation
  };
};
var mapDispatchToProps$3 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchContributionsSummaries: fetchContributionsSummaries,
    deleteContribution: deleteContribution,
    journalize: journalize
  }, dispatch);
};
var ContributionSearcher$1 = withModulesManager(connect(mapStateToProps$5, mapDispatchToProps$3)(injectIntl(ContributionSearcher)));

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$5 = function styles(theme) {
  return {
    page: theme.page,
    fab: theme.fab
  };
};
var ContributionsPage = /*#__PURE__*/function (_Component) {
  _inherits(ContributionsPage, _Component);
  var _super = _createSuper$8(ContributionsPage);
  function ContributionsPage() {
    var _this;
    _classCallCheck(this, ContributionsPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (c) {
      var newTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      historyPush(_this.props.modulesManager, _this.props.history, "contribution.contributionOverview", [c.uuid], newTab);
    });
    return _this;
  }
  _createClass(ContributionsPage, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ContributionSearcher$1, {
        cacheFiltersKey: "contributionsPageFiltersCache",
        onDoubleClick: this.onDoubleClick
      }));
    }
  }]);
  return ContributionsPage;
}(Component);
var mapStateToProps$4 = function mapStateToProps(state) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : []
  };
};
var ContributionsPage$1 = injectIntl(withModulesManager(withHistory(connect(mapStateToProps$4)(withTheme(withStyles(styles$5)(ContributionsPage))))));

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$4 = function styles(theme) {
  return {
    tableTitle: theme.table.title,
    item: theme.paper.item,
    fullHeight: {
      height: "100%"
    }
  };
};
var ContributionMasterPanel = /*#__PURE__*/function (_FormPanel) {
  _inherits(ContributionMasterPanel, _FormPanel);
  var _super = _createSuper$7(ContributionMasterPanel);
  function ContributionMasterPanel() {
    _classCallCheck(this, ContributionMasterPanel);
    return _super.apply(this, arguments);
  }
  _createClass(ContributionMasterPanel, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        edited = _this$props.edited,
        readOnly = _this$props.readOnly;
      return /*#__PURE__*/React.createElement(Fragment, null, !!edited && !!edited.policy && !!edited.policy.value && /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: classes.item
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(TextInput, {
        module: "contribution",
        label: "contribution.policy.name",
        readOnly: true,
        value: edited.policy.product && edited.policy.product.name || ""
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(AmountInput, {
        module: "contribution",
        label: "contribution.policy.value",
        required: true,
        readOnly: true,
        value: edited.policy.value || ""
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "core.DatePicker",
        value: edited.policy.startDate || "",
        module: "contribution",
        label: "contribution.policy.startDate",
        readOnly: true
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "core.DatePicker",
        value: edited.policy.expiryDate || "",
        module: "contribution",
        label: "contribution.policy.expiryDate",
        readOnly: true
      }))), /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: classes.item
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "core.DatePicker",
        value: !edited ? "" : edited.payDate,
        module: "contribution",
        required: true,
        label: "contribution.payDate",
        readOnly: readOnly,
        onChange: function onChange(c) {
          return _this.updateAttribute('payDate', c);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "payer.PayerPicker",
        withNull: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.payer,
        onChange: function onChange(p) {
          return _this.updateAttribute('payer', p);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(AmountInput, {
        module: "contribution",
        label: "contribution.amount",
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.amount,
        onChange: function onChange(c) {
          return _this.updateAttribute('amount', c);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "contribution.PremiumPaymentTypePicker",
        withNull: true,
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.payType,
        onChange: function onChange(c) {
          return _this.updateAttribute('payType', c);
        }
      })), !!edited && edited.payType == 'M' && /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "contribution.PaymentOperatorPicker",
        withNull: true,
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.networkOperator,
        onChange: function onChange(c) {
          return _this.updateAttribute('networkOperator', c);
        }
      })), !!edited && edited.payType == 'M' && /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(NumberInput, {
        module: "contribution",
        label: "Payment.paymentNumber",
        required: true,
        readOnly: readOnly,
        value: !!edited && !!edited.paymentNumber ? edited.paymentNumber : "",
        onChange: function onChange(v) {
          return _this.updateAttribute("paymentNumber", v);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(TextInput, {
        module: "contribution",
        label: "contribution.receipt",
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.receipt,
        onChange: function onChange(c) {
          return _this.updateAttribute('receipt', c);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "contribution.PremiumCategoryPicker",
        withNull: false,
        readOnly: readOnly,
        value: edited && edited.isPhotoFee ? 'photoFee' : 'contribution',
        onChange: function onChange(c) {
          return _this.updateAttribute('isPhotoFee', c === 'photoFee');
        }
      }))));
    }
  }]);
  return ContributionMasterPanel;
}(FormPanel);
var ContributionMasterPanel$1 = withModulesManager(withHistory(injectIntl(withTheme(withStyles(styles$4)(ContributionMasterPanel)))));

var styles$3 = function styles(theme) {
  return {
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton
  };
};
var SaveContributionDialog = function SaveContributionDialog(_ref) {
  var classes = _ref.classes,
    contribution = _ref.contribution,
    onCancel = _ref.onCancel,
    onConfirm = _ref.onConfirm;
  if (!contribution.policy || !contribution.policy.value) return null;
  var _useState = useState(1),
    _useState2 = _slicedToArray(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var amount = parseInt(contribution.amount, 10);
  var policyValue = parseInt(contribution.policy.value, 10);
  return /*#__PURE__*/React.createElement(Dialog, {
    open: !!contribution,
    onClose: onCancel
  }, /*#__PURE__*/React.createElement(DialogTitle, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.title"
  })), /*#__PURE__*/React.createElement(DialogContent, null, amount < policyValue && /*#__PURE__*/React.createElement(React.Fragment, null, step === 1 && /*#__PURE__*/React.createElement(DialogContentText, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageLower"
  })), step === 2 && /*#__PURE__*/React.createElement(DialogContentText, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageLowerConfirm"
  }))), amount >= policyValue && /*#__PURE__*/React.createElement(DialogContentText, null, amount === policyValue && /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageEqual"
  }), amount > policyValue && /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageHigher"
  }))), /*#__PURE__*/React.createElement(DialogActions, null, amount >= policyValue && /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      return onConfirm();
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.ok.button"
  })), amount < policyValue && /*#__PURE__*/React.createElement(React.Fragment, null, step === 1 && /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      return setStep(2);
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.ok.button"
  })), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      return onConfirm('ENFORCE');
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.yes.button"
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick(e) {
      return onConfirm('WAIT');
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.no.button"
  })))), step === 1 && /*#__PURE__*/React.createElement(Button, {
    onClick: onCancel,
    className: classes.secondaryButton
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    module: "core",
    id: "cancel"
  }))));
};
var SaveContributionDialog$1 = injectIntl(withTheme(withStyles(styles$3)(SaveContributionDialog)));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$2 = function styles(theme) {
  return {
    lockedPage: theme.page.locked
  };
};
var CONTRIBUTION_OVERVIEW_MUTATIONS_KEY = "contribution.ContributionOverview.mutations";
var ContributionForm = /*#__PURE__*/function (_Component) {
  _inherits(ContributionForm, _Component);
  var _super = _createSuper$6(ContributionForm);
  function ContributionForm() {
    var _this;
    _classCallCheck(this, ContributionForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "_newContribution", function () {
      return {
        isPhotoFee: false
      };
    });
    _defineProperty(_assertThisInitialized(_this), "state", {
      reset: 0,
      update: false,
      contribution: _this._newContribution(),
      newContribution: true,
      saveContribution: false
    });
    _defineProperty(_assertThisInitialized(_this), "reload", function () {
      var contribution = _this.state.contribution;
      _this.props.fetchContribution(_this.props.modulesManager, _this.state.contribution_uuid, contribution.clientMutationId);
    });
    _defineProperty(_assertThisInitialized(_this), "canSave", function () {
      var contribution = _this.state.contribution;
      if (!contribution || contribution && (!contribution.payDate || !contribution.payType || contribution.payType == 'M' && (!contribution.networkOperator || !contribution.paymentNumber) || !contribution.amount || !contribution.receipt || !contribution.policy || contribution.policy && !contribution.policy.uuid)) return false;
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "confirmSave", function () {
      _this.setState({
        saveContribution: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_save", function (action) {
      _this.setState(function (prevState) {
        var contribution = prevState.contribution;
        if (!!action) {
          contribution.action = action;
        }
        _this.props.save(contribution);
        return {
          saveContribution: false
        };
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onEditedChanged", function (contribution) {
      _this.setState({
        contribution: contribution,
        newContribution: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onActionToConfirm", function (title, message, confirmedAction) {
      _this.setState({
        confirmedAction: confirmedAction
      }, _this.props.coreConfirm(title, message));
    });
    return _this;
  }
  _createClass(ContributionForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
        contribution_uuid = _this$props.contribution_uuid,
        policy_uuid = _this$props.policy_uuid,
        modulesManager = _this$props.modulesManager,
        fetchContribution = _this$props.fetchContribution,
        fetchPolicySummary = _this$props.fetchPolicySummary;
      if (contribution_uuid) {
        this.setState(function (state, props) {
          return {
            contribution_uuid: props.contribution_uuid
          };
        }, function (e) {
          return fetchContribution(modulesManager, contribution_uuid);
        });
      }
      if (policy_uuid) {
        fetchPolicySummary(modulesManager, policy_uuid);
        this.setState({
          contribution: _objectSpread$2(_objectSpread$2({}, this._newContribution()), {}, {
            policy: {
              uuid: policy_uuid,
              value: undefined
            }
          })
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      if (!prevProps.fetchedContribution && !!this.props.fetchedContribution) {
        var contribution = this.props.contribution;
        this.setState({
          contribution: contribution,
          contribution_uuid: contribution.uuid,
          newContribution: false
        });
      } else if (prevProps.contribution_uuid && !this.props.contribution_uuid) {
        this.setState({
          contribution: this._newContribution(),
          newContribution: true,
          contribution_uuid: null
        });
      } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
        this.setState(function (state, props) {
          return {
            contribution: _objectSpread$2(_objectSpread$2({}, state.contribution), {}, {
              clientMutationId: props.mutation.clientMutationId
            })
          };
        });
      } else if (prevProps.confirmed !== this.props.confirmed && !!this.props.confirmed && !!this.state.confirmedAction) {
        this.state.confirmedAction();
      }
      if (!prevProps.policySummary && !!this.props.policySummary) {
        this.setState(function (prevState) {
          return {
            contribution: _objectSpread$2(_objectSpread$2({}, prevState.contribution), {}, {
              policy: _this2.props.policySummary
            })
          };
        });
      }
    }
  }, {
    key: "_cancelSave",
    value: function _cancelSave() {
      var update = this.state.update;
      this.setState({
        saveContribution: false,
        update: !update
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        modulesManager = _this$props2.modulesManager,
        classes = _this$props2.classes,
        state = _this$props2.state,
        rights = _this$props2.rights,
        contribution_uuid = _this$props2.contribution_uuid,
        fetchingContribution = _this$props2.fetchingContribution,
        fetchedContribution = _this$props2.fetchedContribution,
        errorContribution = _this$props2.errorContribution,
        _this$props2$overview = _this$props2.overview,
        overview = _this$props2$overview === void 0 ? false : _this$props2$overview,
        _this$props2$readOnly = _this$props2.readOnly,
        readOnly = _this$props2$readOnly === void 0 ? false : _this$props2$readOnly,
        save = _this$props2.save,
        back = _this$props2.back;
      var _this$state = this.state,
        contribution = _this$state.contribution,
        saveContribution = _this$state.saveContribution,
        newContribution = _this$state.newContribution,
        reset = _this$state.reset,
        update = _this$state.update;
      if (!rights.includes(RIGHT_CONTRIBUTION)) return null;
      var runningMutation = !!contribution && !!contribution.clientMutationId;
      var contributedMutations = modulesManager.getContribs(CONTRIBUTION_OVERVIEW_MUTATIONS_KEY);
      for (var i = 0; i < contributedMutations.length && !runningMutation; i++) {
        runningMutation = contributedMutations[i](state);
      }
      var actions = [{
        doIt: this.reload,
        icon: /*#__PURE__*/React.createElement(ReplayIcon, null),
        onlyIfDirty: !readOnly && !runningMutation
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: !!runningMutation ? classes.lockedPage : null
      }, /*#__PURE__*/React.createElement(Helmet, {
        title: formatMessageWithValues(this.props.intl, "contribution", "ContributionOverview.title")
      }), /*#__PURE__*/React.createElement(SaveContributionDialog$1, {
        contribution: saveContribution && contribution,
        onConfirm: this._save,
        onCancel: function onCancel() {
          return _this3._cancelSave();
        }
      }), /*#__PURE__*/React.createElement(ProgressOrError, {
        progress: fetchingContribution,
        error: errorContribution
      }), (!!fetchedContribution && !!contribution && contribution.uuid === contribution_uuid || !contribution_uuid) && /*#__PURE__*/React.createElement(Form, {
        module: "contribution",
        title: !!newContribution ? "ContributionOverview.newTitle" : "ContributionOverview.title",
        edited_id: contribution_uuid,
        edited: contribution,
        reset: reset,
        back: back
        // add={!!add && !newContribution ? this._add : null}
        ,
        readOnly: readOnly || runningMutation || contribution && !!contribution.validityTo,
        actions: actions,
        overview: overview,
        HeadPanel: ContributionMasterPanel$1,
        contribution: contribution,
        onEditedChanged: this.onEditedChanged,
        canSave: this.canSave,
        save: !!save ? this.confirmSave : null,
        update: update,
        onActionToConfirm: this.onActionToConfirm
      }));
    }
  }]);
  return ContributionForm;
}(Component);
var mapStateToProps$3 = function mapStateToProps(state, props) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    fetchingContribution: state.contribution.fetchingContribution,
    errorContribution: state.contribution.errorContribution,
    fetchedContribution: state.contribution.fetchedContribution,
    submittingMutation: state.contribution.submittingMutation,
    policySummary: state.contribution.policySummary,
    mutation: state.contribution.mutation,
    contribution: state.contribution.contribution,
    confirmed: state.core.confirmed,
    state: state
  };
};
var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchContribution: fetchContribution,
    fetchPolicySummary: fetchPolicySummary,
    newContribution: newContribution,
    createContribution: createContribution,
    journalize: journalize,
    coreConfirm: coreConfirm
  }, dispatch);
};
var ContributionForm$1 = withHistory(withModulesManager(connect(mapStateToProps$3, mapDispatchToProps$2)(injectIntl(withTheme(withStyles(styles$2)(ContributionForm))))));

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$1 = function styles(theme) {
  return {
    page: theme.page
  };
};
var ContributionPage = /*#__PURE__*/function (_Component) {
  _inherits(ContributionPage, _Component);
  var _super = _createSuper$5(ContributionPage);
  function ContributionPage() {
    var _this;
    _classCallCheck(this, ContributionPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "save", function (contribution) {
      if (!contribution.uuid) {
        _this.props.createContribution(_this.props.modulesManager, contribution, formatMessageWithValues(_this.props.intl, "contribution", "CreateContribution.mutationLabel"));
      } else {
        _this.props.updateContribution(_this.props.modulesManager, contribution, formatMessageWithValues(_this.props.intl, "contribution", "UpdateContribution.mutationLabel"));
      }
    });
    return _this;
  }
  _createClass(ContributionPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        rights = _this$props.rights,
        contribution_uuid = _this$props.contribution_uuid,
        policy_uuid = _this$props.policy_uuid,
        overview = _this$props.overview;
      if (!rights.includes(RIGHT_CONTRIBUTION_EDIT)) return null;
      return /*#__PURE__*/React.createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React.createElement(ContributionForm$1, {
        overview: overview,
        contribution_uuid: contribution_uuid,
        policy_uuid: policy_uuid,
        back: function back(e) {
          window.history.back();
        },
        save: rights.includes(RIGHT_CONTRIBUTION_EDIT) ? this.save : null
      }));
    }
  }]);
  return ContributionPage;
}(Component);
var mapStateToProps$2 = function mapStateToProps(state, props) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    contribution_uuid: props.match.params.contribution_uuid,
    policy_uuid: props.match.params.policy_uuid
  };
};
var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createContribution: createContribution,
    updateContribution: updateContribution
  }, dispatch);
};
var ContributionPage$1 = withHistory(withModulesManager(connect(mapStateToProps$2, mapDispatchToProps$1)(injectIntl(withTheme(withStyles(styles$1)(ContributionPage))))));

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ContributionOverviewPage = /*#__PURE__*/function (_Component) {
  _inherits(ContributionOverviewPage, _Component);
  var _super = _createSuper$4(ContributionOverviewPage);
  function ContributionOverviewPage() {
    _classCallCheck(this, ContributionOverviewPage);
    return _super.apply(this, arguments);
  }
  _createClass(ContributionOverviewPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        history = _this$props.history,
        modulesManager = _this$props.modulesManager,
        contribution_uuid = _this$props.contribution_uuid;
      var actions = [{
        doIt: function doIt(e) {
          return historyPush(modulesManager, history, "contribution.contributionOverview", [contribution_uuid]);
        },
        icon: /*#__PURE__*/React.createElement(Edit, null),
        onlyIfDirty: false
      }];
      return /*#__PURE__*/React.createElement(ContributionPage$1, _extends({}, this.props, {
        readOnly: true,
        overview: true,
        actions: actions
      }));
    }
  }]);
  return ContributionOverviewPage;
}(Component);
var mapStateToProps$1 = function mapStateToProps(state, props) {
  return {
    contribution_uuid: props.match.params.contribution_uuid
  };
};
var ContributionOverviewPage$1 = withHistory(withModulesManager(connect(mapStateToProps$1)(ContributionOverviewPage)));

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return {
    paper: theme.paper.paper,
    paperHeader: theme.paper.header,
    paperHeaderAction: theme.paper.action,
    tableTitle: theme.table.title,
    fab: theme.fab,
    disabled: {
      opacity: 0.4
    }
  };
};
var PoliciesPremiumsOverview = /*#__PURE__*/function (_PagedDataHandler) {
  _inherits(PoliciesPremiumsOverview, _PagedDataHandler);
  var _super = _createSuper$3(PoliciesPremiumsOverview);
  function PoliciesPremiumsOverview(props) {
    var _this;
    _classCallCheck(this, PoliciesPremiumsOverview);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "addNewPremium", function () {
      var _this$props = _this.props,
        policy = _this$props.policy,
        modulesManager = _this$props.modulesManager,
        history = _this$props.history;
      historyPush(modulesManager, history, "contribution.contributionNew", [policy.policyUuid]);
    });
    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (i) {
      var newTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props2 = _this.props,
        modulesManager = _this$props2.modulesManager,
        history = _this$props2.history;
      historyPush(modulesManager, history, "contribution.contributionOverview", [i.uuid], newTab);
    });
    _defineProperty(_assertThisInitialized(_this), "policiesChanged", function (prevProps) {
      return !_.isEqual(prevProps.policies, _this.props.policies) && !!_this.props.policies && !!_this.props.policies.length || !_.isEqual(prevProps.policy, _this.props.policy);
    });
    _defineProperty(_assertThisInitialized(_this), "queryPrms", function () {
      var prms = ["orderBy: \"".concat(_this.state.orderBy, "\"")];
      if (!!_this.props.policy) {
        prms.push("policyUuids: ".concat(JSON.stringify([_this.props.policy.policyUuid])));
        return prms;
      } else if (!!_this.props.policies && !!_this.props.policies.length) {
        prms.push("policyUuids: ".concat(JSON.stringify((_this.props.policies || []).map(function (p) {
          return p.policyUuid;
        }))));
        return prms;
      }
      return null;
    });
    _defineProperty(_assertThisInitialized(_this), "onChangeSelection", function (i) {
      _this.props.selectPremium(i[0] || null);
    });
    _defineProperty(_assertThisInitialized(_this), "headers", ["contribution.payDate", "contribution.payer", "contribution.amount", "contribution.payType", "contribution.receipt", "contribution.category", ""]);
    _defineProperty(_assertThisInitialized(_this), "sorter", function (attr) {
      var asc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return [function () {
        return _this.setState(function (state, props) {
          return {
            orderBy: sort(state.orderBy, attr, asc)
          };
        }, function (e) {
          return _this.query();
        });
      }, function () {
        return formatSorter(_this.state.orderBy, attr, asc);
      }];
    });
    _defineProperty(_assertThisInitialized(_this), "headerActions", [_this.sorter("payDate"), _this.sorter("payer"), _this.sorter("amount"), _this.sorter("payType"), _this.sorter("receipt"), _this.sorter("category")]);
    _defineProperty(_assertThisInitialized(_this), "confirmDelete", function (deleteContribution) {
      _this.setState({
        deleteContribution: deleteContribution
      });
    });
    _defineProperty(_assertThisInitialized(_this), "deletePremiumAction", function (i) {
      return !!i.validityTo || !!i.clientMutationId ? null : /*#__PURE__*/React.createElement(Tooltip, {
        title: formatMessage(_this.props.intl, "contribution", "deletePremium.tooltip")
      }, /*#__PURE__*/React.createElement(IconButton, {
        onClick: function onClick() {
          return _this.confirmDelete(i);
        }
      }, /*#__PURE__*/React.createElement(Delete, null)));
    });
    _defineProperty(_assertThisInitialized(_this), "itemFormatters", function () {
      var formatters = [function (p) {
        return formatDateFromISO(_this.props.modulesManager, _this.props.intl, p.payDate);
      }, function (p) {
        return /*#__PURE__*/React.createElement(PublishedComponent, {
          readOnly: true,
          pubRef: "payer.PayerPicker",
          withLabel: false,
          value: p.payer
        });
      }, function (p) {
        return formatAmount(_this.props.intl, p.amount);
      }, function (p) {
        return /*#__PURE__*/React.createElement(PublishedComponent, {
          readOnly: true,
          pubRef: "contribution.PremiumPaymentTypePicker",
          withLabel: false,
          value: p.payType
        });
      }, function (p) {
        return p.receipt;
      }, function (p) {
        return formatMessage(_this.props.intl, "contribution", "category.".concat(!!p.isPhotoFee ? "photoFee" : "contribution"));
      }];
      if (!!_this.props.rights.includes(RIGHT_CONTRIBUTION_DELETE)) {
        formatters.push(_this.deletePremiumAction);
      }
      return formatters;
    });
    _defineProperty(_assertThisInitialized(_this), "deleteContribution", function () {
      var contribution = _this.state.deleteContribution;
      _this.props.selectPremium(null);
      _this.setState({
        deleteContribution: null
      }, function (e) {
        _this.props.deleteContribution(_this.props.modulesManager, contribution, formatMessage(_this.props.intl, "contribution", "deleteContributionDialog.title"));
      });
    });
    _defineProperty(_assertThisInitialized(_this), "header", function () {
      var _this$props3 = _this.props,
        modulesManager = _this$props3.modulesManager,
        intl = _this$props3.intl,
        pageInfo = _this$props3.pageInfo,
        policy = _this$props3.policy;
      if (!!policy && !!policy.policyUuid) {
        return formatMessageWithValues(intl, "contribution", "PoliciesPremiumsOfPolicy", {
          count: pageInfo.totalCount,
          policy: "".concat(policy.productCode, "(").concat(formatDateFromISO(modulesManager, intl, policy.effectiveDate), " - ").concat(formatDateFromISO(modulesManager, intl, policy.expiryDate), ")")
        });
      } else {
        return formatMessageWithValues(intl, "contribution", "PoliciesPremiums", {
          count: pageInfo.totalCount
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "rowDisabled", function (i) {
      return !!i && !!i.validityTo;
    });
    _defineProperty(_assertThisInitialized(_this), "rowLocked", function (i) {
      return !!i && !!i.clientMutationId;
    });
    _this.rowsPerPageOptions = props.modulesManager.getConf("fe-contribution", "familyPremiumsOverview.rowsPerPageOptions", [2, 5, 10, 20]);
    _this.defaultPageSize = props.modulesManager.getConf("fe-contribution", "familyPremiumsOverview.defaultPageSize", 2);
    return _this;
  }
  _createClass(PoliciesPremiumsOverview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.setState({
        orderBy: "-payDate",
        deleteContribution: null
      }, function (e) {
        return _this2.query();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.policiesChanged(prevProps)) {
        this.query();
      }
      if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props4 = this.props,
        intl = _this$props4.intl,
        family = _this$props4.family,
        classes = _this$props4.classes,
        policiesPremiums = _this$props4.policiesPremiums,
        errorPoliciesPremiums = _this$props4.errorPoliciesPremiums,
        pageInfo = _this$props4.pageInfo,
        readOnly = _this$props4.readOnly,
        policy = _this$props4.policy,
        rights = _this$props4.rights,
        fetchingPoliciesPremiums = _this$props4.fetchingPoliciesPremiums;
      if (!family.uuid) return null;
      var canAdd = rights.includes(RIGHT_CONTRIBUTION_ADD);
      var actions = [{
        button: /*#__PURE__*/React.createElement(IconButton, {
          onClick: this.query
        }, /*#__PURE__*/React.createElement(ReplayIcon, null)),
        tooltip: formatMessage(intl, "contribution", "reload.tooltip")
      }];
      if (!!!readOnly && canAdd) {
        actions.push({
          button: /*#__PURE__*/React.createElement(IconButton, {
            className: !policy ? classes.disabled : "",
            onClick: !policy ? null : this.addNewPremium
          }, /*#__PURE__*/React.createElement(Add, null)),
          tooltip: !policy ? formatMessage(intl, "contribution", "addNewPremium.tooltip.selectPolicy") : formatMessage(intl, "contribution", "addNewPremium.tooltip")
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DeleteContributionDialog$1, {
        contribution: this.state.deleteContribution,
        onConfirm: this.deleteContribution,
        onCancel: function onCancel(e) {
          return _this3.setState({
            deleteContribution: null
          });
        }
      }), /*#__PURE__*/React.createElement(Paper, {
        className: classes.paper
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        alignItems: "center",
        direction: "row",
        className: classes.paperHeader
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 8
      }, /*#__PURE__*/React.createElement(Typography, {
        className: classes.tableTitle
      }, this.header())), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        direction: "row",
        justify: "flex-end"
      }, actions.map(function (a, idx) {
        return /*#__PURE__*/React.createElement(Grid, {
          item: true,
          key: "form-action-".concat(idx),
          className: classes.paperHeaderAction
        }, withTooltip(a.button, a.tooltip));
      })))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Table, {
        fetching: fetchingPoliciesPremiums,
        module: "contribution",
        headerActions: this.headerActions,
        headers: this.headers,
        itemFormatters: this.itemFormatters(),
        items: policiesPremiums || [],
        error: errorPoliciesPremiums,
        onDoubleClick: this.onDoubleClick,
        withSelection: "single",
        onChangeSelection: this.onChangeSelection,
        withPagination: true,
        rowsPerPageOptions: this.rowsPerPageOptions,
        defaultPageSize: this.defaultPageSize,
        page: this.currentPage(),
        pageSize: this.currentPageSize(),
        rowDisabled: function rowDisabled(i) {
          return _this3.rowDisabled(i);
        },
        rowLocked: function rowLocked(i) {
          return _this3.rowLocked(i);
        },
        count: pageInfo.totalCount,
        onChangePage: this.onChangePage,
        onChangeRowsPerPage: this.onChangeRowsPerPage
      })));
    }
  }]);
  return PoliciesPremiumsOverview;
}(PagedDataHandler);
var mapStateToProps = function mapStateToProps(state) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    family: state.insuree.family || {},
    policy: state.policy.policy,
    policies: state.policy.policies,
    fetchingPoliciesPremiums: state.contribution.fetchingPoliciesPremiums,
    fetchedPoliciesPremiums: state.contribution.fetchedPoliciesPremiums,
    policiesPremiums: state.contribution.policiesPremiums,
    pageInfo: state.contribution.policiesPremiumsPageInfo,
    errorPoliciesPremiums: state.contribution.errorPoliciesPremiums,
    errorContributions: state.contribution.errorContributions,
    submittingMutation: state.contribution.submittingMutation,
    mutation: state.contribution.mutation
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetch: fetchPoliciesPremiums,
    selectPremium: selectPremium,
    deleteContribution: deleteContribution,
    journalize: journalize
  }, dispatch);
};
var PoliciesPremiumsOverview$1 = withModulesManager(injectIntl(withTheme(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PoliciesPremiumsOverview)))));

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PremiumPaymentTypePicker = /*#__PURE__*/function (_Component) {
  _inherits(PremiumPaymentTypePicker, _Component);
  var _super = _createSuper$2(PremiumPaymentTypePicker);
  function PremiumPaymentTypePicker() {
    _classCallCheck(this, PremiumPaymentTypePicker);
    return _super.apply(this, arguments);
  }
  _createClass(PremiumPaymentTypePicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConstantBasedPicker, _extends({
        module: "contribution",
        label: "contribution.payType",
        constants: PREMIUM_PAYMENT_TYPES
      }, this.props));
    }
  }]);
  return PremiumPaymentTypePicker;
}(Component);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PremiumCategoryPicker = /*#__PURE__*/function (_Component) {
  _inherits(PremiumCategoryPicker, _Component);
  var _super = _createSuper$1(PremiumCategoryPicker);
  function PremiumCategoryPicker() {
    _classCallCheck(this, PremiumCategoryPicker);
    return _super.apply(this, arguments);
  }
  _createClass(PremiumCategoryPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConstantBasedPicker, _extends({
        module: "contribution",
        label: "contribution.category",
        constants: PREMIUM_CATEGORIES
      }, this.props));
    }
  }]);
  return PremiumCategoryPicker;
}(Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PaymentOperatorPicker = /*#__PURE__*/function (_Component) {
  _inherits(PaymentOperatorPicker, _Component);
  var _super = _createSuper(PaymentOperatorPicker);
  function PaymentOperatorPicker() {
    _classCallCheck(this, PaymentOperatorPicker);
    return _super.apply(this, arguments);
  }
  _createClass(PaymentOperatorPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConstantBasedPicker, _extends({
        module: "contribution",
        label: "Payment.operator",
        constants: PAYMENT_OPERATORS
      }, this.props));
    }
  }]);
  return PaymentOperatorPicker;
}(Component);

var messages_en = {
	"contribution.addNewPremium.tooltip": "Add new contribution",
	"contribution.reload.tooltip": "Reload",
	"contribution.addNewPremium.tooltip.selectPolicy": "Please select a policy to add a contribution",
	"contribution.amount": "Amount",
	"contribution.amount_Gte": "Amount above",
	"contribution.amount_Lte": "Amount under",
	"contribution.category": "Contribution Category",
	"contribution.category.contribution": "Contribution",
	"contribution.category.null": "Any",
	"contribution.category.photoFee": "Photo Fee",
	"contribution.ContributionOverview.newTitle": "Add a contribution",
	"contribution.ContributionOverview.title": "Contribution Details",
	"contribution.contributionSummaries": "{count} contributions Found",
	"contribution.CreateContribution.mutationLabel": "Create contribution",
	"contribution.deleteContributionDialog.message": "Are you sure you want to delete this contribution?",
	"contribution.deleteContributionDialog.title": "Delete contribution",
	"contribution.deleteContributionDialog.yes.button": "Yes",
	"contribution.deletePremium.tooltip": "Delete contribution",
	"contribution.menu.contributions": "Contributions",
	"contribution.openNewTab": "Open in new tab",
	"contribution.openNewTabHead": " ",
	"contribution.payDate": "Payment Date",
	"contribution.payDateFrom": "Payment Date from",
	"contribution.payDateTo": "Payment Date to",
	"contribution.payer": "Payer",
	"contribution.payType": "Payment Type",
	"contribution.payType.B": "Bank Transfer",
	"contribution.payType.C": "Cash",
	"contribution.payType.M": "Mobile Phone",
	"contribution.payType.null": "Any",
	"contribution.PoliciesPremiums": "{count} Contributions",
	"contribution.PoliciesPremiumsOfPolicy": "{count} Contributions of Policy {policy}",
	"contribution.policy": "Policy n°",
	"contribution.PremiumPaymentTypePicker.label": "Payment Type",
	"contribution.receipt": "Receipt No.",
	"contribution.showHistory": "Show historical values",
	"contribution.UpdateContribution.mutationLabel": "Update contribution",
	"contribution.saveContributionDialog.title": "Contribution confirmation",
	"contribution.saveContributionDialog.messageLower": "The contribution is lower than the policy value",
	"contribution.saveContributionDialog.messageLowerConfirm": "Should the policy come into force?",
	"contribution.saveContributionDialog.messageEqual": "The contribution matches the value of the policy",
	"contribution.saveContributionDialog.messageHigher": "The contribution is higher than the value of the policy",
	"contribution.saveContributionDialog.ok.button": "OK",
	"contribution.saveContributionDialog.yes.button": "Yes",
	"contribution.saveContributionDialog.no.button": "No",
	"contribution.policy.name": "Policy name",
	"contribution.policy.value": "Policy value",
	"contribution.policy.startDate": "Start date",
	"contribution.policy.expiryDate": "Expiry date",
	"contribution.Payment.paymentNumber": "Mobile Phone",
	"contribution.Payment.operator": "Network operator",
	"contribution.Payment.operator.O": "Orange Money",
	"contribution.Payment.operator.M": "MTN Mobile money",
	"contribution.Payment.operator.null": "Any"
};

var messages_fr = {
	"contribution.Payment.paymentNumber": "Numéro de téléphone",
	"contribution.Payment.operator": "Opérateur réseau",
	"contribution.Payment.operator.O": "Orange Money",
	"contribution.Payment.operator.M": "MTN Mobile money",
	"contribution.Payment.operator.null": "Tout"
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    fetchingPoliciesPremiums: false,
    fetchedPoliciesPremiums: false,
    errorPoliciesPremiums: null,
    policiesPremiumsPageInfo: {
      totalCount: 0
    },
    policiesPremiums: null,
    premium: null,
    contributions: [],
    contributionsPageInfo: {
      totalCount: 0
    },
    fetchingContributions: false,
    fetchedContributions: false,
    errorContributions: null,
    contribution: null,
    fetchingContribution: false,
    errorContribution: null,
    submittingMutation: false,
    mutation: {},
    policySummary: null,
    errorPolicySummary: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'INSUREE_FAMILY_OVERVIEW_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingPoliciesPremiums: false,
        fetchedPoliciesPremiums: false,
        policiesPremiums: null,
        policiesPremiumsPageInfo: {
          totalCount: 0
        },
        errorPoliciesPremiums: null,
        premium: null
      });
    case 'POLICY_INSUREE_POLICIES_REQ':
    case 'POLICY_FAMILY_POLICIES_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        policiesPremiums: null,
        policiesPremiumsPageInfo: {
          totalCount: 0
        },
        errorPoliciesPremiums: null,
        premium: null
      });
    case 'CONTRIBUTION_POLICES_PREMIUMS_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingPoliciesPremiums: true,
        fetchedPoliciesPremiums: false,
        policiesPremiums: null,
        policiesPremiumsPageInfo: {
          totalCount: 0
        },
        errorPoliciesPremiums: null,
        premium: null
      });
    case 'CONTRIBUTION_POLICES_PREMIUMS_RESP':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingPoliciesPremiums: false,
        fetchedPoliciesPremiums: true,
        policiesPremiums: parseData(action.payload.data.premiumsByPolicies),
        policiesPremiumsPageInfo: pageInfo(action.payload.data.premiumsByPolicies),
        errorPoliciesPremiums: formatGraphQLError(action.payload)
      });
    case 'CONTRIBUTION_POLICES_PREMIUMS_ERR':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingPoliciesPremiums: false,
        errorPoliciesPremiums: formatServerError(action.payload)
      });
    case 'CONTRIBUTION_PREMIUM':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        premium: action.payload
      });
    case 'CONTRIBUTION_CONTRIBUTIONS_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContributions: true,
        fetchedContributions: false,
        contributions: null,
        contributionsPageInfo: {
          totalCount: 0
        },
        errorContributions: null
      });
    case 'CONTRIBUTION_CONTRIBUTIONS_ERR':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContributions: false,
        errorContributions: formatServerError(action.payload)
      });
    case 'CONTRIBUTION_CONTRIBUTIONS_RESP':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContributions: false,
        fetchedContributions: true,
        contributions: parseData(action.payload.data.premiums),
        contributionsPageInfo: pageInfo(action.payload.data.premiums),
        errorContributions: formatGraphQLError(action.payload)
      });
    case 'CONTRIBUTION_POLICY_SUMMARY_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        policySummary: null,
        errorPolicySummary: null
      });
    case 'CONTRIBUTION_POLICY_SUMMARY_RESP':
      var policies = parseData(action.payload.data.policies);
      var policySummary = null;
      if (!!policies && policies.length > 0) {
        policySummary = policies[0];
      }
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        policySummary: policySummary,
        errorPolicySummary: formatGraphQLError(action.payload)
      });
    case 'CONTRIBUTION_POLICY_SUMMARY_ERR':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        errorPolicySummary: formatServerError(action.payload)
      });
    case 'CONTRIBUTION_OVERVIEW_REQ':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContribution: true,
        fetchedContribution: false,
        contribution: null,
        errorContribution: null
      });
    case 'CONTRIBUTION_OVERVIEW_RESP':
      var contributions = parseData(action.payload.data.premiums);
      var contribution = null;
      if (!!contributions && contributions.length > 0) {
        contribution = contributions[0];
      }
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContribution: false,
        fetchedContribution: true,
        contribution: contribution,
        errorContribution: formatGraphQLError(action.payload)
      });
    case 'CONTRIBUTION_OVERVIEW_ERR':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        fetchingContribution: false,
        errorContribution: formatServerError(action.payload)
      });
    case 'CONTRIBUTION_NEW':
      return _objectSpread$1(_objectSpread$1({}, state), {}, {
        contributionsPageInfo: {
          totalCount: 0
        },
        contribution: null
      });
    case 'CONTRIBUTION_MUTATION_REQ':
      return dispatchMutationReq(state, action);
    case 'CONTRIBUTION_MUTATION_ERR':
      return dispatchMutationErr(state, action);
    case 'CONTRIBUTION_UPDATE_RESP':
      return dispatchMutationResp(state, "updatePremium", action);
    case 'CONTRIBUTION_DELETE_RESP':
      return dispatchMutationResp(state, "deletePremium", action);
    case 'CONTRIBUTION_CREATE_RESP':
      return dispatchMutationResp(state, "createPremium", action);
    default:
      return state;
  }
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ROUTE_CONTRIBUTION_CONTRIBUTIONS = "contribution/contributions";
var ROUTE_CONTRIBUTION_CONTRIBUTION = "contribution/new";
var ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW = "contribution/overview";
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }],
  "reducers": [{
    key: 'contribution',
    reducer: reducer
  }],
  "refs": [{
    key: "contribution.PremiumPicker.projection",
    ref: ["id", "uuid", "receipt"]
  }, {
    key: "contribution.PremiumPaymentTypePicker",
    ref: PremiumPaymentTypePicker
  }, {
    key: "contribution.PremiumCategoryPicker",
    ref: PremiumCategoryPicker
  }, {
    key: "contribution.PaymentOperatorPicker",
    ref: PaymentOperatorPicker
  }, {
    key: "contribution.contributions",
    ref: ROUTE_CONTRIBUTION_CONTRIBUTIONS
  }, {
    key: "contribution.contributionNew",
    ref: ROUTE_CONTRIBUTION_CONTRIBUTION
  }, {
    key: "contribution.contributionOverview",
    ref: ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW
  }],
  "core.Router": [{
    path: ROUTE_CONTRIBUTION_CONTRIBUTIONS,
    component: ContributionsPage$1
  }, {
    path: ROUTE_CONTRIBUTION_CONTRIBUTION + "/:policy_uuid",
    component: ContributionPage$1
  }, {
    path: ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW + "/:contribution_uuid",
    component: ContributionOverviewPage$1
  }],
  "insuree.MainMenu": [{
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      module: "contribution",
      id: "menu.contributions"
    }),
    icon: /*#__PURE__*/React.createElement(MonetizationOn, null),
    route: "/" + ROUTE_CONTRIBUTION_CONTRIBUTIONS,
    filter: function filter(rights) {
      return rights.includes(RIGHT_CONTRIBUTION);
    }
  }],
  "insuree.FamilyOverview.panels": [PoliciesPremiumsOverview$1]
};
var ContributionModule = function ContributionModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

export { ContributionModule };
//# sourceMappingURL=index.es.js.map
