<script setup lang='ts' name="HomeView">
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
</script>
<template>
  <div class="home_view">
    <div class="container">
      <div class="MAI">{{ t("UserAgreement.privacy_policy") }}</div>
      <div class="Privacy">
        <div class="FS24700" style="margin-bottom: 24px">
          {{ t("UserAgreement.user_privacy_agreement") }}
        </div>
        <div class="FS24700">
          {{ t("UserAgreement.sections.introduction.title") }}
        </div>

        {{ t("UserAgreement.sections.introduction.choosing")
        }}<span class="FS16700">MAIverse</span>
        {{ t("UserAgreement.sections.introduction.content") }}
        <span class="FS16700">Tokenomics</span>
        {{ t("UserAgreement.sections.introduction.Whenusing") }}
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.personal_information.title") }}
        </div>
        <div>
          {{ t("UserAgreement.sections.personal_information.description") }}
        </div>
        <div>
          <div class="FS16700">
            {{
              t("UserAgreement.sections.personal_information.types.Identifying")
            }}
          </div>
          {{
            t(
              "UserAgreement.sections.personal_information.types.identifying_information"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{ t("UserAgreement.sections.personal_information.types.account") }}
          </div>
          {{
            t(
              "UserAgreement.sections.personal_information.types.account_information"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{
              t("UserAgreement.sections.personal_information.types.transaction")
            }}
          </div>
          {{
            t(
              "UserAgreement.sections.personal_information.types.transaction_data"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{ t("UserAgreement.sections.personal_information.types.usage") }}
          </div>
          {{
            t("UserAgreement.sections.personal_information.types.usage_data")
          }}
        </div>
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.use_of_information.title") }}
        </div>
        <div style="margin-bottom: 24px">
          {{ t("UserAgreement.sections.use_of_information.description") }}
        </div>
        <div>
          <div class="FS16700">
            {{
              t("UserAgreement.sections.use_of_information.purposes.provision")
            }}
          </div>
          {{
            t(
              "UserAgreement.sections.use_of_information.purposes.provision_and_optimization"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{
              t(
                "UserAgreement.sections.use_of_information.purposes.authentication"
              )
            }}
          </div>
          {{
            t(
              "UserAgreement.sections.use_of_information.purposes.authentication_and_security"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{
              t("UserAgreement.sections.use_of_information.purposes.marketing")
            }}
          </div>
          {{
            t(
              "UserAgreement.sections.use_of_information.purposes.marketing_and_promotion"
            )
          }}
        </div>
        <div>
          <div class="FS16700">
            {{ t("UserAgreement.sections.use_of_information.purposes.legal") }}
          </div>
          {{
            t(
              "UserAgreement.sections.use_of_information.purposes.legal_compliance"
            )
          }}
        </div>
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.information_sharing.title") }}
        </div>
        <div style="margin-bottom: 24px">
          {{ t("UserAgreement.sections.information_sharing.description") }}
        </div>
        <div>
          {{
            t(
              "UserAgreement.sections.information_sharing.third_party_service_providers"
            )
          }}
        </div>
        <div>
          {{
            t("UserAgreement.sections.information_sharing.legal_requirements")
          }}
        </div>
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.blockchain_transparency.title") }}
        </div>
        {{ t("UserAgreement.sections.blockchain_transparency.content") }}
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.nft_rights.title") }}
        </div>
        {{ t("UserAgreement.sections.nft_rights.content") }}

        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.data_protection.title") }}
        </div>
        {{ t("UserAgreement.sections.data_protection.content") }}
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.user_rights.title") }}
        </div>
        <div style="margin-bottom: 24px">
          {{ t("UserAgreement.sections.user_rights.description") }}
        </div>
        <div>{{ t("UserAgreement.sections.user_rights.rights.access") }}</div>
        <div>
          {{
            t("UserAgreement.sections.user_rights.rights.update_and_correction")
          }}
        </div>
        <div>{{ t("UserAgreement.sections.user_rights.rights.deletion") }}</div>
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.token_economy.title") }}
        </div>
        {{ t("UserAgreement.sections.token_economy.content") }}
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.privacy_policy_update.title") }}
        </div>
        {{ t("UserAgreement.sections.privacy_policy_update.content") }}
        <div class="FS24700" style="margin-top: 24px">
          {{ t("UserAgreement.sections.contact.title") }}
        </div>
        <div style="margin-bottom: 24px">
          {{ t("UserAgreement.sections.contact.description") }}
        </div>
        <div>{{ t("UserAgreement.sections.contact.email") }}</div>
        <div>{{ t("UserAgreement.sections.contact.address") }}</div>
      </div>
    </div>
  </div>
</template>






<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  .container {
    padding-top: 40px;
    padding-bottom: 120px;
    padding: 40px 20px 120px 20px;
    max-width: 680px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
.MAI {
  display: flex;
  padding: 12.5px 24px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 24px;
  border: 1px solid #141414;
  background: #e621ca;
  color: #fff;
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
  margin-bottom: 24px;
}
.Privacy {
  color: #ffffff;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
}
.FS24700 {
  color: #fff;
  font-family: Rubik;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
  letter-spacing: -0.48px;
}
.FS16700 {
  color: #fff;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.32px;
  display: inline-block;
}
</style>
