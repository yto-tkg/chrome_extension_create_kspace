export const userValidateRules = {
  required: '必須です',
  userPattern: { value: /^Administrator|cybozu$/, message: 'Administrator又はcybozuを選択してください' }

}

export const nameValidateRules = {
  required: '必須です',
  spaceNameMaxLength: { value: 100, message: '100字以内で入力してください' },

}

export const countValidateRules = {
  required: '必須です',
  countPattern: { value: /^[0-9]{1,2}+$/, message: '2桁以内の半角数字を入力してください' },
}
