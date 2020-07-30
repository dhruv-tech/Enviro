<!--
  (i) Written by Dhruv, Loading Screen.
-->

<!-- CSS -->
<style lang="scss" scoped src="./css/Home.scss"></style>

<!-- XML -->
<template>
    <Page actionBarHidden="true">
      <ScrollView orientation="vertical">

        <FlexboxLayout flexDirection="column" justifyContent="center" id="loading-container">

          <StackLayout id="enviro-leaf-logo">
            <Image src="~/components/imgs/enviro-logo.png" stretch="aspectFit"/>
          </StackLayout>

          <Label v-bind:text="location.city" class="title" id="city"/>
          
        </FlexboxLayout>

      </ScrollView>
    </Page>
</template>

<!-- JS -->
<script src="./js/Home.js"></script>