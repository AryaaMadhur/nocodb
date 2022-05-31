import { XcActionType, XcForm, XcType } from 'nocodb-sdk';
import { NcUpgraderCtx } from '../NcUpgrader';
import Plugin from '../../../noco-models/Plugin';

const input: XcForm = {
  title: 'Configure Google Cloud Storage',
  items: [
    {
      key: 'bucket',
      label: 'Bucket Name',
      placeholder: 'Bucket Name',
      type: XcType.SingleLineText,
      required: true
    },
    {
      key: 'client_email',
      label: 'Client Email',
      placeholder: 'Client Email',
      type: XcType.SingleLineText,
      required: true
    },
    {
      key: 'private_key',
      label: 'Private Key',
      placeholder: 'Private Key',
      type: XcType.Password,
      required: true
    },
    {
      key: 'project_id',
      label: 'Project ID',
      placeholder: 'Project ID',
      type: XcType.SingleLineText,
      required: false
    }
  ],
  actions: [
    {
      label: 'Test',
      placeholder: 'Test',
      key: 'test',
      actionType: XcActionType.TEST,
      type: XcType.Button
    },
    {
      label: 'Save',
      placeholder: 'Save',
      key: 'save',
      actionType: XcActionType.SUBMIT,
      type: XcType.Button
    }
  ],
  msgOnInstall:
    'Successfully installed and attachment will be stored in Google Cloud Storage',
  msgOnUninstall: ''
};

export default async function(_: NcUpgraderCtx) {
  // include a new input - project_id to GCS form
  const plugin = await Plugin.getPluginByTitle("GCS")
  plugin.input_schema = JSON.stringify(input)
  await Plugin.update(plugin.id, plugin)
}