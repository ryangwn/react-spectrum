/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {CollectionBase, DOMProps, DOMRefValue, StyleProps} from '@react-types/shared';
import {Key, ReactNode, RefObject} from 'react';

export interface ActionBarProps<T> extends CollectionBase<T> {
  // Required. When zero, the ActionBar is hidden.
  selectedItemCount: number | 'all',
  // Also required. When clicked, the selection should be cleared.
  onClearSelection: () => void,
  restoreFocusRef: RefObject<DOMRefValue<HTMLElement>> | RefObject<HTMLElement>,
  isEmphasized?: boolean,
  onAction?: (key: Key) => void,
  /**
   * Whether to restore focus back to the element that was focused
   * when the focus scope mounted, after the focus scope unmounts.
   * 
   * Accepts a boolean or a ref for the component or element to which focus should be restored.
   */
  restoreFocus?: boolean | RefObject<DOMRefValue<HTMLElement>> | RefObject<HTMLElement>
}

export interface SpectrumActionBarProps<T> extends ActionBarProps<T>, DOMProps, StyleProps {}

interface ActionBarContainerProps {
  children: ReactNode
}

export interface SpectrumActionBarContainerProps extends ActionBarContainerProps, DOMProps, StyleProps {}
