import { generateJSON } from '../logic.js';

const TEMPLATE = `
  <style>
    :host {
      display: contents;
    }

    dialog {
      position: fixed;
      inset: 0;
      margin: auto;
      width: min(560px, calc(100vw - 2rem));
      max-height: calc(100vh - 2rem);
      height: fit-content;
      box-sizing: border-box;
      background: var(--bg-elevated, #191a1c);
      color: var(--text-primary, #ece6df);
      border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.14));
      border-radius: 10px;
      padding: 0;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
      font-family: inherit;
    }

    dialog::backdrop {
      background: rgba(12, 10, 9, 0.66);
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-secondary, #8f8a84);
      font-size: 1.5rem;
      line-height: 1;
      padding: 0.125rem 0.375rem;
      cursor: pointer;
      border-radius: 4px;
    }

    .close-btn:hover,
    .close-btn:focus-visible {
      color: var(--text-primary, #ece6df);
      outline: none;
    }

    .dialog-body {
      padding: 1.25rem;
    }

    .field-label {
      display: block;
      margin-bottom: 0.375rem;
      color: var(--text-secondary, #8f8a84);
      font-size: 0.71875rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .name-input {
      width: 100%;
      box-sizing: border-box;
      background: var(--bg-inset, rgba(0, 0, 0, 0.28));
      border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.14));
      border-radius: 6px;
      color: var(--text-primary, #ece6df);
      font-family: inherit;
      font-size: 0.875rem;
      padding: 0.55rem 0.7rem;
      margin-bottom: 1rem;
    }

    .name-input::placeholder {
      color: var(--text-secondary, #8f8a84);
      opacity: 0.8;
    }

    .name-input:focus {
      outline: none;
      border-color: var(--accent-red, #ff5a4f);
    }

    .dialog-preview {
      box-sizing: border-box;
      margin: 0 0 1rem 0;
      padding: 0.75rem 0.85rem;
      background: var(--bg-inset, rgba(0, 0, 0, 0.28));
      border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
      border-radius: 6px;
      color: var(--text-secondary, #b9b3ac);
      font-family: inherit;
      font-size: 0.75rem;
      line-height: 1.5;
      white-space: pre;
      overflow: auto;
      max-height: 200px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .dialog-actions button {
      font-family: inherit;
      font-size: 0.8125rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 0.55rem 1.05rem;
      border-radius: 6px;
      cursor: pointer;
      background: none;
      color: var(--text-primary, #ece6df);
      border: 1px solid var(--border-strong, rgba(255, 255, 255, 0.18));
    }

    .dialog-actions button:hover {
      border-color: var(--text-secondary, #8f8a84);
    }

    .dialog-actions button.primary {
      background: var(--accent-red, #ff5a4f);
      border-color: var(--accent-red, #ff5a4f);
      color: #fff;
    }

    .dialog-actions button.primary:hover {
      background: var(--accent-red-strong, #ff6b60);
      border-color: var(--accent-red-strong, #ff6b60);
    }
  </style>

  <dialog aria-labelledby="save-dialog-title">
    <header class="dialog-header">
      <h2 id="save-dialog-title">Save preset</h2>
      <button class="close-btn" type="button" aria-label="Close">&times;</button>
    </header>
    <div class="dialog-body">
      <div class="field">
        <label class="field-label" for="preset-name-input">Preset name</label>
        <input
          id="preset-name-input"
          class="name-input"
          type="text"
          placeholder="Name this preset"
          autocomplete="off"
          spellcheck="false"
        />
      </div>
      <span class="field-label preview-label">Preview</span>
      <pre class="dialog-preview"></pre>
      <div class="dialog-actions">
        <button class="cancel-btn" type="button">Cancel</button>
        <button class="confirm-btn primary" type="button">Save preset</button>
      </div>
    </div>
  </dialog>
`;

/**
 * <tb-save-dialog> — modal for naming + saving a custom preset.
 *
 * Wraps a native <dialog> in Shadow DOM. The parent (<tb-app>) sets the
 * `env` property (the resolved flags object to preview) and calls open()/
 * close(). On confirm, dispatches `tb:save-preset` with { detail: { name } };
 * the actual persistence (snapshot + localStorage) is the app's job.
 */
export class TBSaveDialog extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = TEMPLATE;

    this._dialog = shadow.querySelector('dialog');
    this._nameInput = shadow.querySelector('.name-input');
    this._preview = shadow.querySelector('.dialog-preview');
    this._closeBtn = shadow.querySelector('.close-btn');
    this._cancelBtn = shadow.querySelector('.cancel-btn');
    this._confirmBtn = shadow.querySelector('.confirm-btn');
    this._env = null;

    this._closeBtn.addEventListener('click', () => this.close());
    this._cancelBtn.addEventListener('click', () => this.close());
    this._confirmBtn.addEventListener('click', () => this._confirm());

    this._nameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._confirm();
      }
    });

    // Backdrop click → close. A click landing on the <dialog> element itself
    // (i.e. the ::backdrop region, not on any inner content) triggers this.
    this._dialog.addEventListener('click', (event) => {
      if (event.target === this._dialog) {
        this.close();
      }
    });
  }

  /** The resolved flags object used to build the read-only preview. */
  get env() {
    return this._env;
  }

  set env(value) {
    this._env = value && typeof value === 'object' ? value : null;
    if (this._dialog && this._dialog.open) {
      this._renderPreview();
    }
  }

  /** Show the modal: render preview, clear the name field, focus the input. */
  open() {
    this._nameInput.value = '';
    this._renderPreview();
    if (!this._dialog.open) {
      this._dialog.showModal();
    }
    this._focusInput();
  }

  /** Close the dialog (no-op if already closed). */
  close() {
    if (this._dialog.open) {
      this._dialog.close();
    }
  }

  /** Focus + select the name input, after the modal has rendered. */
  _focusInput() {
    requestAnimationFrame(() => {
      this._nameInput.focus();
      this._nameInput.select();
    });
  }

  /** Validate the name; if valid, dispatch tb:save-preset and close. */
  _confirm() {
    const name = this._nameInput.value.trim();
    if (!name) {
      this._nameInput.focus();
      this._nameInput.select();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('tb:save-preset', {
        detail: { name },
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  /** Render the read-only JSON preview from the current env. */
  _renderPreview() {
    const json = generateJSON(this._env || {});
    this._preview.textContent =
      typeof json === 'string' ? json : JSON.stringify(json, null, 2);
  }
}

if (!customElements.get('tb-save-dialog')) {
  customElements.define('tb-save-dialog', TBSaveDialog);
}
