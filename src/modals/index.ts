import { ModalInterface } from '../interface/ModalInterface'
import { ValidModel } from '../constant/valid_models'
import { OpenAI_3_5_turbo } from './modal/OPENAI_35_turbo'
/**
 * This object contains all the modals that are available in the extension.
 * @type {Record<ValidModel, ModalInterface>}
 */
export const modals: Record<ValidModel, ModalInterface> = {
  'openai_3.5_turbo': new OpenAI_3_5_turbo(),
}