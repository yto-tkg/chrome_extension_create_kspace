export const nameValidateRules = {
  required: '必須です',
  maxLength: { value: 100, message: '100字以内で入力してください' },

}

export const countValidateRules = {
  required: '必須です',
  pattern: { value: /^[0-9]{1,2}$/, message: '2桁以内の数字を入力してください' }
}
