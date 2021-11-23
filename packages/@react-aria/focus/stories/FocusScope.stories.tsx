/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {DOMRefValue} from '@react-types/shared';
import {FocusScope} from '../';
import {Meta, Story} from '@storybook/react';
import React, {ReactNode, RefObject, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

const dialogsRoot = 'dialogsRoot';

interface StoryProps {
  usePortal: boolean,
  useRestoreFocusRef: boolean
}

const meta: Meta<StoryProps> = {
  title: 'FocusScope',
  component: FocusScope
};

export default meta;

const Template = (): Story<StoryProps> => ({usePortal, useRestoreFocusRef}) => <Example usePortal={usePortal} useRestoreFocusRef={useRestoreFocusRef} />;

function MaybePortal({children, usePortal}: { children: ReactNode, usePortal: boolean}) {
  if (!usePortal) {
    return <>{children}</>;
  }

  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById(dialogsRoot)
  );
}

function NestedDialog({onClose, usePortal, restoreFocus = true}: {onClose: VoidFunction, usePortal: boolean, restoreFocus?: boolean | RefObject<DOMRefValue<HTMLElement>> | RefObject<HTMLElement>}) {
  let [open, setOpen] = useState(false);

  return (
    <MaybePortal usePortal={usePortal}>
      <FocusScope contain restoreFocus={restoreFocus} autoFocus>
        <div>
          <input />

          <input />

          <input />

          <button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </button>

          <button type="button" onClick={onClose}>
            close
          </button>

          {open && <NestedDialog onClose={() => setOpen(false)} usePortal={usePortal} />}
        </div>
      </FocusScope>
    </MaybePortal>
  );
}

function Example({usePortal, useRestoreFocusRef = false}: StoryProps) {
  let [open, setOpen] = useState(false);
  let restoreFocusRef = useRef(null);

  return (
    <div>
      <input />

      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>

      {useRestoreFocusRef && <input ref={restoreFocusRef} placeholder="Restore focus here!" />}

      {open && <NestedDialog onClose={() => setOpen(false)} usePortal={usePortal} restoreFocus={useRestoreFocusRef ? restoreFocusRef : true} />}

      <div id={dialogsRoot} />
    </div>
  );
}

export const KeyboardNavigation = Template().bind({});
KeyboardNavigation.args = {usePortal: false};

export const KeyboardNavigationInsidePortal = Template().bind({});
KeyboardNavigationInsidePortal.args = {usePortal: true};

export const RestoreFocusRef = Template().bind({});
RestoreFocusRef.args = {usePortal: false, useRestoreFocusRef: true};

export const RestoreFocusRefInsidePortal = Template().bind({});
RestoreFocusRefInsidePortal.args = {usePortal: true, useRestoreFocusRef: true};
