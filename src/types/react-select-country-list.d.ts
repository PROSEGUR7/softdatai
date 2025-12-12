declare module 'react-select-country-list' {
  interface CountryData {
    label: string;
    value: string;
  }

  interface CountryList {
    data: CountryData[];
    getValue: (label: string) => string | undefined;
    getLabel: (value: string) => string | undefined;
    getLabels: () => string[];
    getValues: () => string[];
    getData: () => CountryData[];
    setData: (data: CountryData[]) => void;
    setValueType: (type: string) => void;
    setLabelType: (type: string) => void;
  }

  export default function countryList(): CountryList;
}
