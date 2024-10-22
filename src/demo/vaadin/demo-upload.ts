import "@vaadin/button";
import "@vaadin/horizontal-layout";
import { Notification } from "@vaadin/notification";
import "@vaadin/progress-bar";
import "@vaadin/upload";
import type { Upload, UploadFileRejectEvent } from "@vaadin/upload";
import "@vaadin/vertical-layout";
import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-upload")
export class DemoUpload extends LitElement {
  @property()
  public uploadText: string = "Upload files...";

  @query("vaadin-upload")
  private upload!: Upload;

  uploadFiles() {
    this.upload?.uploadFiles();
    console.log("Uploading all files!");
  }

  render() {
    const maxFileSizeInMB = 10;
    const maxFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;

    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Upload</h1>

      <h4 style="color: var(--primary-50); margin-top: 0">
        The upload button is a slot named add-button. Here, we use our own
        'vaadin-button' component with gives us the option of a solid primary or
        bordered default theme.
      </h4>

      <div class="container">
        <comet-card>
          <div class="upload-container">
            <vaadin-upload target="/api/fileupload">
              <vaadin-button slot="add-button" theme="small primary"
                >Upload files...</vaadin-button
              >
            </vaadin-upload>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="upload-container">
            <label
              >With queued and individual upload 'play' icon and upload all
              files option</label
            >
            <vaadin-upload no-auto>
              <vaadin-button slot="add-button" theme="small primary"
                >Upload files...</vaadin-button
              >
            </vaadin-upload>
            <vaadin-button @click="${this.uploadFiles}" theme="small primary"
              >Upload All Files
            </vaadin-button>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="upload-container">
            <vaadin-upload
              method="PUT"
              target="/api/upload-handler"
              headers='{ "X-API-KEY": "7f4306cb-bb25-4064-9475-1254c4eff6e5" }'
            >
              <vaadin-button slot="add-button" theme="small"
                >Upload files...</vaadin-button
              >
            </vaadin-upload>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="upload-container">
            <div style="margin-bottom: 48px;">
              <label for="upload-drop-enabled">Drag and drop enabled</label>
              <vaadin-upload id="upload-drop-enabled" .nodrop="${false}">
                <vaadin-button slot="add-button" theme="small"
                  >Upload files...</vaadin-button
                >
              </vaadin-upload>
            </div>
            <div>
              <label for="upload-drop-disabled">Drag and drop disabled</label>
              <vaadin-upload id="upload-drop-disabled" nodrop>
                <vaadin-button slot="add-button" theme="small primary"
                  >Upload files...</vaadin-button
                >
              </vaadin-upload>
            </div>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <div class="upload-container">
          <comet-card>
            <label
              >With max upload 1 file and max file size of 10MB. Notification
              shown if file too big.</label
            >
            <vaadin-upload
              max-files-reached
              max-files="1"
              .maxFileSize="${maxFileSizeInBytes}"
              @file-reject="${(event: UploadFileRejectEvent) => {
                Notification.show(event.detail.error);
              }}"
            >
              <vaadin-button slot="add-button" theme="small primary"
                >Upload files...</vaadin-button
              >
            </vaadin-upload>
          </comet-card>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
    }

    .container {
      background-color: var(--neutral-10);
      padding: 24px 48px;
    }

    .upload-container {
      padding: 20px;
    }

    ::part(comet-card-container) {
      padding: var(--spacing-l);
    }

    label {
      color: var(--comet-color-font-dark);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-upload": DemoUpload;
  }
}
