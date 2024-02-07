import { isEmpty } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import Button, { ButtonProps } from '../button';
import { FormContext } from '../form/context';

export interface ButtonFieldProps extends ButtonProps {
  type: 'submit';
  text?: string;
  hideIcon?: boolean;
}

export default function ButtonField(props: ButtonFieldProps) {
  const { t } = useTranslation();
  const {
    disabled: _disabled,
    text = t('common:save'),
    hideIcon = true,
    ...rest
  } = props;
  const {
    formState: { isSubmitting, errors },
  } = useFormContext();
  const { editable } = useContext(FormContext);

  if (!editable && !isSubmitting) {
    return null;
  }

  const isValid = isEmpty(errors);
  const disabled = _disabled || !isValid || isSubmitting;

  return (
    <Button {...rest} disabled={disabled}>
      {text ?? t('common:submit')}
    </Button>
  );
}
