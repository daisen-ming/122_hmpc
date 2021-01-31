// 统一管理整个项目所有表单验证规则的地方
export const loginRules = {
  mobile: [
    {
      required: true,
      pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      len: 6,
      message: '验证码不正确',
      trigger: 'change'
    }
  ],
  check: [
    {
      validator: (rule, value, callback) => {
        if (value === false) {
          callback(new Error('请勾选协议'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

export const articleAddRules = {
  title: [ // 规则名(必须和v-model的变量名一致)
    {
      min: 5,
      max: 30,
      required: true,
      message: '标题5到30字符',
      trigger: 'blur' // 在失去焦点触发验证规则
    }
  ],
  content: [
    { required: true, message: '内容必须填写', trigger: 'blur' }
  ],
  channel_id: [
    {
      required: true,
      trigger: 'blur',
      message: '频道必须选择'
    }
  ]
}
