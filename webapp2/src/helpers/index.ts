import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export const numberWithSpaces = (x: string) => {
  if(x != "NaN" && x != ""){
    let parts = parseFloat(x).toFixed(2).split(".")
    //parts = x.split(".")
    
    let int = parts[0] ? parseInt(parts[0]).toLocaleString('ru-RU') : ""
    return int + (parts[1] ? ('.' + parts[1] ) : '.00')
  }
  return '-- --'
}