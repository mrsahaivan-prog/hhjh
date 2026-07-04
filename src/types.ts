/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MemberData {
  name: string;
  countryName: string;
  countryFlag: string;
  memberNo: number; // Selected founder number from 1 to 150
  joinedDate: string;
  secretKey: string; // Unique cryptographic token for validation
}

export interface CountryListItem {
  name: string;
  flag: string;
  prefix: string;
}

export interface RegistryEntry {
  name: string;
  countryFlag: string;
  memberNo: number;
  status: 'Verified' | 'Pending' | 'Secured';
  timestamp: string;
}
