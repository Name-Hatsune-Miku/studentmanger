<template>
    <div class="login">
        <div class='login-wrap'>
            <div class='main-box'>
                <div :class="['container', 'container-login']">
                    <form ref="loginForm" :model="loginForm">
                        <h2 class='title'>学生录入管理系统</h2>
                        <input v-model='loginForm.username' class='form__input' placeholder='请输入用户名' type='text' />
                        <input v-model='loginForm.password' class='form__input' placeholder='请输入密码' type='password' />
                        <div class='primary-btn' @click='submitForm()'>立即登录</div>
                    </form>
                </div>
                <div :class="['switch']">
                    <div class='switch__circle'></div>
                    <div class='switch__circle switch__circle_top'></div>
                    <div class='switch__container'>
                        欢迎登录
                    </div>
                </div>
            </div>
        </div>
        <div v-show="showCountdown" class="countdown-tip">即将跳转至首页，{{ countdown }}...</div>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
    data: function () {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            addresss: [],
            // param: {
            //     username: 'admin',
            //     password: '123456'
            // },
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            // rules: {
            //     username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            //     password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            // },
            showCountdown: false, // 控制倒计时提示框的显示
            countdown: 3, // 倒计时初始值
        };
    },
    mounted() {
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        submitForm() {
            this.showCountdown = true; // 显示倒计时提示
            this.countdownInterval = setInterval(() => { // 开始倒计时
                if (this.countdown === 0) {
                    clearInterval(this.countdownInterval); // 清除计时器
                    this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                    })
                    this.showCountdown = false; // 隐藏倒计时提示
                } else {
                    this.countdown--; // 减少倒计时
                }
            }, 1000); // 每1000毫秒（1秒）执行一次
        },
    },
    beforeDestroy() { // 组件销毁前清除定时器
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    },
};
</script>

<style scoped>
.countdown-tip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: red;
    font-size: 18px;
    z-index: 100;
}

.login {
    widows: 100%;
    height: 100vh;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    /*background-color: #ecf0f3;*/
    transition: all 1.25s;
}

.main-box {
    /*width: 100%;*/
    /*height: 100%;*/
    /*border-radius: 20px;*/
    /*font-size: 30px;*/
    /*letter-spacing: 0.5em;*/
    /*backdrop-filter: blur(20px);*/
    /*color: #fff;*/
    /*box-shadow: 0 0 10px 5px #eee;*/
    position: relative;
    width: 1000px;
    height: 600px;
    padding: 25px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px 5px #eee;
    /*box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;*/
    border-radius: 12px;
    overflow: hidden;
}


form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #a0a5a8;
}

.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
}

.text {
    margin-top: 30px;
    margin-bottom: 12px;
}

.form__input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    /*background-color: #ecf0f3;*/
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.container-register {
    z-index: 100;
    left: calc(100% - 600px);
}

.container-login {
    left: calc(100% - 600px);
    z-index: 0;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z200 {
    z-index: 200;
    transition: 1.25s;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 450px;
    z-index: 200;
    transition: 1.25s;
    /*background-color: #ecf0f3;*/
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    /*color: #a0a5a8;*/
}

.switch__circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    /*background-color: #ecf0f3;*/
    box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch__circle_top {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    /*padding: 50px 55px;*/
    transition: 1.25s;
    color: #fff;
}

h2 {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
}

p {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}


.login {
    left: calc(100% - 400px);
}

.switch__circle {
    left: 0;
}


.primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
}


.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/img/backgroud.png');
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>