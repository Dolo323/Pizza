"use client";
import React from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form/form-textarea";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
  disabled?: boolean;
  className?: string;
}

export const CheckoutAdressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
       
        <Controller 
        control={control}
        name="address"
        render={({ field, fieldState }) => <>
        <AdressInput onChange={field.onChange} />
        {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
        </>}/>

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
