export interface TableHeaders {
    name?: string;
    [key: string]: any;
    sort?: boolean;
    type?:
    | "DATE"
    | "CLICKABLE"
    | "DROPDOWN"
    | "BUTTON"
    | "BUTTONS"
    | "ARRAY"
    | "AMOUNT"
    | "PERCENTAGE"
    | "TIME"
    | "CHECKBOX"
    | "IMAGE"
    | "NUMBER"
    | "IMAGECLICKABLE"
    | "BANKDETAILS"
    | "DATETIME"
    | "ISARRAY"
    | "ORDER_BUTTON"
    | "STATUS_BUTTON"
    | "STATUS"
    | "MANUAL_BUTTON"
    | "COPY_IMAGE"
    | "ACCOUNT"
    | "BANKLIST"
    | "TOGGLE_SWITCH"
    | "TOGGLE_SWITCH_TOTP"
    | "FILE_PATH"
    | "TOGGLE_BUTTON"
    | "COPY_AMOUNT"
    |  "DOWNLOAD"
    | "";
    buttonTitle?: string;
    permission?: string;
    dropdownOptions?: TableDropdownOptions[];
    visible?: boolean;
  }
  
  declare global {
    declare interface NextRequest extends NextRequestBase {
      cookies: {
        authorisation?: string;
        merchantid?: string;
        brandId?: any;
      };
      query: {
        itemsPerPage?: any;
        pageNumber?: any;
        bonusStatus?: any;
        bonusType?: any;
        allocationType?: any;
        bonusCode?: any;
      };
      headers: {
        authorisation?: string;
        merchantId?: string;
        merchantid?: string;
        brandId?: any;
      };
    }
  }
  export interface DropDownList {
    name?: string;
    value?: string;
  }
  
  export interface DropDownListBoolean {
    name?: string;
    value?: boolean;
  }