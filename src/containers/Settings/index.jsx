import React from "react";
import { Form, Field } from "react-final-form";
import { Flex, FlexChild, BoxWithShadow } from "../../components/Div";
import { MainWrapper } from "../Dashboard/components/Div";
import { H1, PText } from "../../components/Text";
import { PrimaryButton } from "../../components/Button";
import InputSelect from "../../components/InputSelect";
import { currencies } from "../../utils/currency";
import { useOAuth } from "../Login/hooks/useOAuth";
import { constants } from "../../utils/constants";

function SettingsContainer() {
  const { actions, currentUser } = useOAuth();
  const initialValues = {
    currency_unit: currentUser?.currency_unit || constants.defaultCurrency,
  };

  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: [currency.symbol, currency.name],
  }));

  const handleSubmit = (values) => {
    actions.updateCurrentUser(values);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid } = getState();
        return (
          <form onSubmit={formHandleSubmit}>
            <MainWrapper align="center" className="mt-5">
              <H1>Settings</H1>
              <BoxWithShadow direction="column" className="mt-5" padding="30px">
                <Flex align="baseline" className="mt-5">
                  <FlexChild padding="10px 20px">
                    <PText tt="normal">Currency Unit</PText>
                  </FlexChild>
                  <FlexChild>
                    <Field
                      name="currency_unit"
                      component={InputSelect}
                      options={currencyOptions}
                      isMultiLabeled
                    />
                  </FlexChild>
                </Flex>
                <PrimaryButton
                  variant="primary"
                  size="lg"
                  className="mt-5 w-50"
                  type="submit"
                  disabled={pristine || !valid}
                >
                  Save
                </PrimaryButton>
              </BoxWithShadow>
            </MainWrapper>
          </form>
        );
      }}
    />
  );
}

export default SettingsContainer;
