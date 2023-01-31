<template>
  <div class="box" style="margin-top: 36px">
    <h2>参照若依加密解密: npm i jsencrypt -S</h2>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      label-width="120px"
      class="demo"
    >
      <el-form-item label="账号" prop="pass">
        <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <div>账号：{{ ruleForm1.pass1 }}</div>
      <div>密码：{{ ruleForm1.checkPass1 }}</div>
      <el-button @click="ToDecrypt(ruleForm1.checkPass1)">密码解密</el-button>
      <div>解密后的密码：{{ decryptPassWord }}</div>
    </el-card>
  </div>
  <div class="box">
    <h2>sm2、3、4加密解密: npm i sm-crypto -S</h2>
    <el-form
      ref="ruleFormRef"
      :model="smForm"
      status-icon
      label-width="120px"
      class="demo"
    >
      <el-form-item label="账号" prop="pass">
        <el-input v-model="smForm.pass" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input v-model="smForm.checkPass" type="text" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="smSubmitForm(smFormRef)"
          >Submit</el-button
        >
        <el-button @click="smResetForm(smFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <div>账号：{{ smForm1.pass1 }}</div>
      <div>密码：{{ smForm1.checkPass1 }}</div>
      <el-button @click="smToDecrypt(smForm1.checkPass1)">密码解密</el-button>
      <div>解密后的密码：{{ smDecryptPassWord }}</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { encrypt, decrypt } from "./jsencrypt";
import { sm2Encrypt, sm2Decrypt } from "./smencrypt";

const ruleForm = reactive({
  pass: null,
  checkPass: null,
});
const ruleForm1 = reactive({
  pass1: null,
  checkPass1: null,
});
const decryptPassWord = ref(null);

const smForm = reactive({
  pass: null,
  checkPass: null,
});
const smForm1 = reactive({
  pass1: null,
  checkPass1: null,
});
const smDecryptPassWord = ref(null);

const submitForm = () => {
  if (!ruleForm.pass || !ruleForm.checkPass) {
    alert("请填写账号或密码");
    return false;
  }
  ruleForm1.pass1 = ruleForm.pass;
  ruleForm1.checkPass1 = encrypt(ruleForm.checkPass);
};

const resetForm = () => {
  smForm.pass = "";
  smForm.checkPass = "";
  smForm1.pass1 = "";
  smForm1.checkPass1 = "";
  smDecryptPassWord.value = "";
};

const ToDecrypt = (password) => {
  smDecryptPassWord.value = decrypt(password);
};

const smSubmitForm = () => {
  if (!smForm.pass || !smForm.checkPass) {
    alert("请填写账号或密码");
    return false;
  }
  smForm1.pass1 = smForm.pass;
  smForm1.checkPass1 = sm2Encrypt(smForm.checkPass);
};

const smResetForm = () => {
  smForm.pass = "";
  smForm.checkPass = "";
  smForm1.pass1 = "";
  smForm1.checkPass1 = "";
  smDecryptPassWord.value = "";
};

const smToDecrypt = (password) => {
  smDecryptPassWord.value = sm2Decrypt(smForm1.checkPass1);
};
</script>

<style scoped>
button {
  margin: 5px 0;
}
.box {
  border: 3px solid aqua;
  padding: 0.5em;
  margin-bottom: 0.5em;
  min-height: 400px;
  height: 400px;
}
</style>
