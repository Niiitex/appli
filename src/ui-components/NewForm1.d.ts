/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NewForm1InputValues = {
    jkn?: string;
    description?: string;
};
export declare type NewForm1ValidationValues = {
    jkn?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewForm1OverridesProps = {
    NewForm1Grid?: FormProps<GridProps>;
    jkn?: FormProps<TextFieldProps>;
    description?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NewForm1Props = React.PropsWithChildren<{
    overrides?: NewForm1OverridesProps | undefined | null;
} & {
    onSubmit: (fields: NewForm1InputValues) => void;
    onCancel?: () => void;
    onChange?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onValidate?: NewForm1ValidationValues;
} & React.CSSProperties>;
export default function NewForm1(props: NewForm1Props): React.ReactElement;
