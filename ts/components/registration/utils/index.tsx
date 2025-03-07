import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { sanitizeSessionUsername } from '../../../session/utils/String';

export function sanitizeDisplayNameOrToast(
  displayName: string,
  setDisplayNameError: (error: string | undefined) => AnyAction,
  dispatch: Dispatch
) {
  try {
    const sanitizedName = sanitizeSessionUsername(displayName);
    const trimName = sanitizedName.trim();
    dispatch(setDisplayNameError(!trimName ? window.i18n('displayNameEmpty') : undefined));
    return sanitizedName;
  } catch (e) {
    dispatch(setDisplayNameError(window.i18n('displayNameErrorDescriptionShorter')));
    return displayName;
  }
}

/**
 * Returns undefined if an error happened, or the trim userName.
 *
 * Be sure to use the trimmed userName for creating the account.
 */
export const displayNameIsValid = (displayName?: string): string => {
  if (!displayName) {
    throw new Error(window.i18n('displayNameEmpty'));
  }

  const trimName = displayName.trim();
  if (!trimName) {
    throw new Error(window.i18n('displayNameEmpty'));
  }

  return trimName;
};
