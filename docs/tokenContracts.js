const TokenContracts = {
  template: `
    <div class="m-0 p-0">
      <b-card no-body no-header class="border-0">

        <b-modal ref="modaladdtokencontract" v-model="settings.addTokenContract.show" @close="settings.addTokenContract.show = false; saveSettings();" hide-footer header-class="m-0 px-3 py-2" body-class="m-0 p-0" body-bg-variant="light" size="lg">
          <template #modal-title>Add Token Contract</template>
          <div class="m-0 p-1">
            <b-form-group label="Token:" label-for="modaladdtokencontract-address" label-size="sm" label-cols-sm="3" label-align-sm="right" :state="!settings.addTokenContract.address || validAddress(settings.addTokenContract.address)" :invalid-feedback="'Invalid address'" class="mx-0 my-1 p-0">
              <b-input-group  style="width: 25.0rem;">
                <b-form-input size="sm" id="modaladdtokencontract-address" v-model.trim="settings.addTokenContract.address" @change="saveSettings" placeholder="Token address, e.g., 0x1234...6789"></b-form-input>
                <b-input-group-append>
                  <b-dropdown size="sm" id="dropdown-left" text="" variant="link" v-b-popover.hover.ds500="'Sample Token Contracts'" class="m-0 ml-1 p-0">
                    <b-dropdown-item v-if="sampleTokenContracts.length == 0" disabled>No Token Agents contracts on this network</b-dropdown-item>
                    <div v-for="(item, index) of sampleTokenContracts" v-bind:key="index">
                      <b-dropdown-item @click="settings.addTokenContract.address = item.address; saveSettings(); loadTokenContract(settings.addTokenContract.address);">{{ index }}. {{ item.address.substring(0, 8) + '...' + item.address.slice(-6) }} <b-badge variant="light">{{ item.type }}</b-badge>{{ item.symbol + ' ' + item.name }}</b-dropdown-item>
                    </div>
                  </b-dropdown>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group label="Type:" label-for="modaladdtokencontract-tokentype" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-form-input size="sm" plaintext id="modaladdtokencontract-tokentype" :value="settings.addTokenContract.type" class="pl-2 w-25"></b-form-input>
            </b-form-group>
            <b-form-group label="Symbol:" label-for="modaladdtokencontract-symbol" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-form-input size="sm" plaintext id="modaladdtokencontract-symbol" :value="settings.addTokenContract.symbol" class="pl-2 w-25"></b-form-input>
            </b-form-group>
            <b-form-group label="Name:" label-for="modaladdtokencontract-name" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-form-input size="sm" plaintext id="modaladdtokencontract-name" :value="settings.addTokenContract.name" class="pl-2 w-50"></b-form-input>
            </b-form-group>
            <b-form-group v-if="settings.addTokenContract.type == 20" label="Decimals:" label-for="modaladdtokencontract-decimals" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-form-input size="sm" plaintext id="modaladdtokencontract-decimals" :value="settings.addTokenContract.decimals" class="pl-2 w-25"></b-form-input>
            </b-form-group>
            <b-form-group v-if="settings.addTokenContract.type == 20" label="Total Supply:" label-for="modaladdtokencontract-totalsupply" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-form-input size="sm" plaintext id="modaladdtokencontract-totalsupply" :value="formatDecimals(settings.addTokenContract.totalSupply, settings.addTokenContract.decimals)" class="pl-2 w-25"></b-form-input>
            </b-form-group>
            <b-form-group v-if="settings.addTokenContract.image" label="Image:" label-for="modaladdtokencontract-image" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-img button rounded fluid size="15rem" :src="settings.addTokenContract.image" class="m-0 p-0" style="width: 100px;">
              </b-img>
            </b-form-group>
            <b-form-group label="" label-size="sm" label-cols-sm="3" label-align-sm="right" class="mx-0 my-1 p-0">
              <b-button size="sm" @click="addTokenContract" variant="link" v-b-popover.hover.ds500="'Add token contract'"><b-icon-plus shift-v="+1" font-scale="1.2"></b-icon-plus></b-button>
            </b-form-group>
          </div>

          <!--
          addTokenContract: {
            show: false,
            address: null,
            type: null,
            symbol: null,
            name: null,
            decimals: null,
            totalSupply: null,
            slug: null,
            image: null,
          }, -->

        </b-modal>

        <!-- :TOOLBAR -->
        <div class="d-flex flex-wrap m-0 p-0">
          <div v-if="false" class="mt-0 pr-1">
            <b-form-input type="text" size="sm" v-model.trim="settings.filter" @change="saveSettings" debounce="600" v-b-popover.hover.ds500="'Filter by address or ENS name fragment'" placeholder="🔍 address / ens name"></b-form-input>
          </div>
          <div v-if="false" class="mt-0 pr-1" style="max-width: 8.0rem;">
            <b-form-select size="sm" v-model="settings.accountTypeFilter" @change="saveSettings" :options="accountTypeFilters" v-b-popover.hover.ds500="'Filter by account types'"></b-form-select>
          </div>
          <!--
          <div class="mt-0 pr-1" style="max-width: 8.0rem;">
            <b-form-select size="sm" v-model="settings.myAccountsFilter" @change="saveSettings" :options="myAccountsFilterOptions" v-b-popover.hover.ds500="'My accounts filter'"></b-form-select>
          </div>
          -->
          <div v-if="false" class="mt-0 pr-1">
            <b-dropdown size="sm" variant="link" v-b-popover.hover.ds500="settings.myAccountsFilter == null ? 'All accounts' : (settings.myAccountsFilter == 'mine' ? 'My accounts' : 'Other accounts')">
              <template #button-content>
                <span v-if="settings.myAccountsFilter == null">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="person-fill" variant="dark" scale="0.5" shift-v="3" shift-h="-3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="-3"></b-icon>
                  </b-iconstack>
                </span>
                <span v-else-if="settings.myAccountsFilter == 'mine'">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="person-fill" variant="dark" scale="0.75"></b-icon>
                  </b-iconstack>
                </span>
                <span v-else>
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="-3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="3"></b-icon>
                    <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="-3"></b-icon>
                  </b-iconstack>
                </span>
              </template>
              <b-dropdown-item href="#" @click="settings.myAccountsFilter = null; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="person-fill" variant="dark" scale="0.5" shift-v="3" shift-h="-3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="-3"></b-icon>
                </b-iconstack>
                All Accounts
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="settings.myAccountsFilter = 'mine'; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="person-fill" variant="dark" scale="0.75"></b-icon>
                </b-iconstack>
                My Accounts
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="settings.myAccountsFilter = 'notmine'; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="-3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="3" shift-h="3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="3"></b-icon>
                  <b-icon stacked icon="person" variant="info" scale="0.5" shift-v="-3" shift-h="-3"></b-icon>
                </b-iconstack>
                Other Accounts
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <div v-if="false" class="mt-0 pr-1">
            <b-dropdown size="sm" variant="link" v-b-popover.hover.ds500="settings.junkFilter == 'excludejunk' ? 'Junk excluded' : (settings.junkFilter == null ? 'Junk included' : 'Junk')">
              <template #button-content>
                <span v-if="settings.junkFilter == null">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="circle-fill" variant="warning"></b-icon>
                    <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </span>
                <span v-else-if="settings.junkFilter == 'excludejunk'">
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                    <b-icon stacked icon="slash-circle" variant="danger"></b-icon>
                  </b-iconstack>
                </span>
                <span v-else>
                  <b-iconstack font-scale="1">
                    <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </span>
              </template>
              <b-dropdown-item href="#" @click="settings.junkFilter = null; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="circle-fill" variant="warning"></b-icon>
                  <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                </b-iconstack>
                Include Junk
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="settings.junkFilter = 'excludejunk'; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                  <b-icon stacked icon="slash-circle" variant="danger"></b-icon>
                </b-iconstack>
                Exclude Junk
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="settings.junkFilter = 'junk'; saveSettings()">
                <b-iconstack font-scale="1">
                  <b-icon stacked icon="trash" variant="info" scale="0.75"></b-icon>
                </b-iconstack>
                Junk
              </b-dropdown-item>
            </b-dropdown>
          </div>
          <!--
          <div class="mt-0 pr-1">
            <b-button size="sm" :pressed.sync="settings.showAdditionalFilters" @click="saveSettings" variant="link" v-b-popover.hover.ds500="'Additional filters'"><span v-if="settings.showAdditionalFilters"><b-icon-funnel-fill shift-v="+1" font-scale="1.0"></b-icon-funnel-fill></span><span v-else><b-icon-funnel shift-v="+1" font-scale="1.0"></b-icon-funnel></span></b-button>
          </div>
          -->
          <div class="mt-0 flex-grow-1">
          </div>
          <div class="mt-0 flex-grow-1">
          </div>
          <div v-if="sync.section == null" class="mt-0 pr-1">
            <!-- <b-button size="sm" :disabled="!networkSupported" @click="viewModalAddAccount" variant="link" v-b-popover.hover.ds500="'Add new account'"><b-icon-plus shift-v="+1" font-scale="1.2"></b-icon-plus></b-button> -->
            <b-button size="sm" :disabled="!networkSupported" @click="settings.addTokenContract.show = true; saveSettings();" variant="link" v-b-popover.hover.ds500="'Add new Token Contract'"><b-icon-plus shift-v="+1" font-scale="1.2"></b-icon-plus></b-button>
          </div>
          <div class="mt-0 flex-grow-1">
          </div>
          <div v-if="sync.section == null" class="mt-0 pr-1">
            <b-button size="sm" :disabled="!networkSupported" @click="viewSyncOptions" variant="link" v-b-popover.hover.ds500="'Sync data from the blockchain'"><b-icon-arrow-repeat shift-v="+1" font-scale="1.2"></b-icon-arrow-repeat></b-button>
          </div>
          <div v-if="sync.section != null" class="mt-1" style="width: 300px;">
            <b-progress height="1.5rem" :max="sync.total" show-progress :animated="sync.section != null" :variant="sync.section != null ? 'success' : 'secondary'" v-b-popover.hover.ds500="'Click the button on the right to stop. This process can be continued later'">
              <b-progress-bar :value="sync.completed">
                {{ sync.total == null ? (sync.completed + ' ' + sync.section) : (sync.completed + '/' + sync.total + ' ' + ((sync.completed / sync.total) * 100).toFixed(0) + '% ' + sync.section) }}
              </b-progress-bar>
            </b-progress>
          </div>
          <div class="ml-0 mt-1">
            <b-button v-if="sync.section != null" size="sm" @click="halt" variant="link" v-b-popover.hover.ds500="'Click to stop. This process can be continued later'"><b-icon-stop-fill shift-v="+1" font-scale="1.0"></b-icon-stop-fill></b-button>
          </div>
          <div class="mt-0 flex-grow-1">
          </div>
          <div v-if="false && sync.section == null" class="mt-0 pr-1">
            <b-button size="sm" @click="exportAccounts" variant="link" v-b-popover.hover.ds500="'Export accounts'"><b-icon-file-earmark-spreadsheet shift-v="+1" font-scale="1.2"></b-icon-file-earmark-spreadsheet></b-button>
          </div>
          <div v-if="false" class="mt-0 pr-1">
            <b-button size="sm" :disabled="!transferHelper" @click="newTransfer(null); " variant="link" v-b-popover.hover.ds500="'New Stealth Transfer'"><b-icon-caret-right shift-v="+1" font-scale="1.1"></b-icon-caret-right></b-button>
          </div>
          <div class="mt-0 flex-grow-1">
          </div>
          <div class="mt-0 pr-1">
            <b-form-select size="sm" v-model="settings.sortOption" @change="saveSettings" :options="sortOptions" v-b-popover.hover.ds500="'Yeah. Sort'"></b-form-select>
          </div>
          <div class="mt-0 pr-1">
            <font size="-2" v-b-popover.hover.ds500="'# accounts'">{{ filteredSortedTokenContracts.length + '/' + totalTokenContracts }}</font>
          </div>
          <div class="mt-0 pr-1">
            <b-pagination size="sm" v-model="settings.currentPage" @input="saveSettings" :total-rows="filteredSortedTokenContracts.length" :per-page="settings.pageSize" style="height: 0;"></b-pagination>
          </div>
          <div class="mt-0 pl-1">
            <b-form-select size="sm" v-model="settings.pageSize" @change="saveSettings" :options="pageSizes" v-b-popover.hover.ds500="'Page size'"></b-form-select>
          </div>
        </div>

        <b-card v-if="settings.showAdditionalFilters" no-body no-header bg-variant="light" class="m-1 p-1 w-75">
          <div class="mt-0 pr-1" style="width: 15.0rem;">
            <b-card no-header no-body class="m-0 mt-1 p-0 border-1">
              <b-card-body class="m-0 p-0">
                BLAH
                <!--
                <font size="-2">
                  <b-table small fixed striped sticky-header="200px" :fields="accountsFilterFields" :items="getAllAccounts" head-variant="light">
                    <template #cell(select)="data">
                      <b-form-checkbox size="sm" :checked="(settings.filters['accounts'] && settings.filters['accounts'][data.item.account]) ? 1 : 0" value="1" @change="filterChanged('accounts', data.item.account)"></b-form-checkbox>
                    </template>
                    <template #cell(account)="data">
                      {{ ensOrAccount(data.item.account, 20) }}
                    </template>
                  </b-table>
                </font>
                -->
              </b-card-body>
            </b-card>
          </div>
        </b-card>

        <b-table ref="tokenContractsTable" small fixed striped responsive hover selectable select-mode="single" @row-selected='rowSelected' :fields="tokenContractsFields" :items="pagedFilteredSortedTokenContracts" show-empty head-variant="light" class="m-0 mt-1">
          <template #empty="scope">
            <h6>{{ scope.emptyText }}</h6>
            <div v-if="totalTokenContracts == 0">
              <ul>
                <li>
                  Click <b-button size="sm" variant="link" class="m-0 p-0"><b-icon-plus shift-v="+1" font-scale="1.2"></b-icon-plus></b-button> above to either:
                  <ul>
                    <li>Add your attached web3 address</li>
                    <li>Add an address</li>
                    <!-- <li>Add a Stealth Meta-Address</li>
                    <li>Generate a Stealth Meta-Address</li> -->
                  </ul>
                </li>
              </ul>
            </div>
          </template>
          <!-- <template #head(number)="data">
            <b-dropdown size="sm" variant="link" v-b-popover.hover.ds500="'Toggle selection'">
              <template #button-content>
                <b-icon-check-square shift-v="+1" font-scale="0.9"></b-icon-check-square>
              </template>
              <b-dropdown-item href="#" @click="toggleSelectedAccounts(pagedFilteredSortedTokenContracts)">Toggle selection for all accounts on this page</b-dropdown-item>
              <b-dropdown-item href="#" @click="toggleSelectedAccounts(filteredSortedTokenContracts)">Toggle selection for all accounts on all pages</b-dropdown-item>
              <b-dropdown-item href="#" @click="clearSelectedAccounts()">Clear selection</b-dropdown-item>
            </b-dropdown>
          </template> -->
          <template #cell(number)="data">
            <!-- <b-form-checkbox size="sm" :checked="settings.selectedAccounts[data.item.account] ? 1 : 0" value="1" @change="toggleSelectedAccounts([data.item])"> -->
              {{ parseInt(data.index) + ((settings.currentPage - 1) * settings.pageSize) + 1 }}
            <!-- </b-form-checkbox> -->
          </template>
          <template #cell(options)="data">
            <b-button size="sm" :pressed.sync="data.item.junk" @click="toggleTokenContractField(data.item.address, 'junk')" variant="transparent" v-b-popover.hover.ds500="data.item.junk ? 'Junk' : 'Not junk'" class="m-0 ml-1 p-0">
              <b-icon :icon="data.item.junk ? 'trash-fill' : 'trash'" shift-v="+1" font-scale="1.2" :variant="data.item.junk ? 'primary' : 'secondary'">
              </b-icon>
            </b-button>
            <!-- <b-button size="sm" :disabled="data.item.junk" :pressed.sync="data.item.mine" @click="toggleTokenContractField(data.item.account, 'mine')" variant="transparent" v-b-popover.hover.ds500="data.item.mine ? 'My account' : 'Not my account'" class="m-0 ml-1 p-0">
              <b-icon :icon="(data.item.mine && !data.item.junk) ? 'person-fill' : 'person'" shift-v="+1" font-scale="1.2" :variant="(data.item.junk || !data.item.mine) ? 'secondary' : 'primary'">
              </b-icon>
            </b-button> -->
            <b-button size="sm" :disabled="data.item.junk" :pressed.sync="data.item.watch" @click="toggleTokenContractField(data.item.address, 'watch')" variant="transparent" v-b-popover.hover.ds500="(data.item.watch ? 'Watch' : 'Do not watch') + ' this token contract for transfers and approvals'" class="m-0 ml-1 p-0">
              <b-icon :icon="(data.item.watch && !data.item.junk) ? 'eye-fill' : 'eye'" shift-v="+1" font-scale="1.2" :variant="(data.item.junk || !data.item.watch) ? 'secondary' : 'primary'">
              </b-icon>
            </b-button>
            <!-- <b-button size="sm" :disabled="data.item.junk || !data.item.mine || data.item.account.substring(0, 3) == 'st:'" :pressed.sync="data.item.sendFrom" @click="toggleTokenContractField(data.item.account, 'sendFrom')" variant="transparent" v-b-popover.hover.ds500="'ETH and tokens ' + (data.item.sendFrom ? 'can' : 'cannot') + ' be sent from this address'" class="m-0 ml-1 p-0">
              <b-icon :icon="(data.item.sendFrom && data.item.mine && !data.item.junk) ? 'arrow-up-right-circle-fill' : 'arrow-up-right-circle'" shift-v="+1" font-scale="1.2" :variant="(data.item.junk || !data.item.sendFrom) || !data.item.mine || data.item.account.substring(0, 3) == 'st:' ? 'secondary' : 'primary'">
              </b-icon>
            </b-button> -->
            <b-button size="sm" :disabled="data.item.junk" :pressed.sync="data.item.transfers" @click="toggleTokenContractField(data.item.address, 'transfers')" variant="transparent" v-b-popover.hover.ds500="'Transfers and approvals are ' + (data.item.transfers ? 'permitted' : 'not permitted')" class="m-0 ml-1 p-0">
              <b-icon :icon="(data.item.transfers && !data.item.junk) ? 'arrow-right-circle-fill' : 'arrow-right-circle'" shift-v="+1" font-scale="1.2" :variant="(data.item.junk || !data.item.transfers) ? 'secondary' : 'primary'">
              </b-icon>
            </b-button>
            <!-- <b-button v-if="data.item.account.substring(0, 3) == 'st:'" size="sm" :disabled="!transferHelper || data.item.junk || !data.item.sendTo" @click="newTransfer(data.item.account);" variant="link" v-b-popover.hover.ds500="'New Stealth Transfer to ' + data.item.account" class="m-0 ml-1 p-0">
              <b-icon-caret-right shift-v="+1" font-scale="1.2">
              </b-icon-caret-right>
            </b-button> -->
            <b-button size="sm" @click="deleteTokenContract(data.item.address)" variant="transparent" v-b-popover.hover.ds500="'Delete token contract from this list'" class="m-0 ml-5 p-0">
              <b-icon-trash shift-v="+1" font-scale="1.1" variant="danger">
              </b-icon-trash>
            </b-button>
          </template>
          <template #cell(tokenContract)="data">
            <b-link size="sm" :href="explorer + 'token/' + data.item.address" variant="link" target="_blank">
              {{ data.item.address }}
            </b-link>
            <br />
            <b-badge variant="light">{{ data.item.type }}</b-badge>
          </template>
          <template #cell(name)="data">
            {{ data.item.name }}
            <br />
            <font size="-1">
              {{ data.item.symbol || '&nbsp;' }}
            </font>
          </template>
          <template #cell(image)="data">
            <b-img v-if="data.item.image" button rounded fluid size="15rem" :src="data.item.image" class="m-0" style="width: 60px;">
            </b-img>

            <!-- <div v-if="data.item.type == 'preerc721' || data.item.type == 'erc721' || data.item.type == 'erc1155'">
              <b-avatar rounded variant="light" size="3.0rem" :src="data.item.image" v-b-popover.hover.ds500="'ERC-721 collection'"></b-avatar>
            </div>
            <div v-else-if="data.item.type == 'eoa' && data.item.account != ensOrAccount(data.item.account)">
              <b-avatar rounded variant="light" size="3.0rem" :src="'https://metadata.ens.domains/mainnet/avatar/' + ensOrAccount(data.item.account)" v-b-popover.hover.ds500="'ENS avatar if set'"></b-avatar>
            </div>
            <div v-else-if="data.item.type == 'erc20'">
              <b-avatar rounded variant="light" size="3.0rem" :src="'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/' + data.item.account + '/logo.png'" v-b-popover.hover.ds500="'ERC-20 logo if available'"></b-avatar>
            </div> -->
          </template>
        </b-table>
      </b-card>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      reschedule: true,
      settings: {
        filter: null,
        accountTypeFilter: null,
        myAccountsFilter: null,
        junkFilter: null,
        showAdditionalFilters: false,
        selectedAccounts: {},
        currentPage: 1,
        pageSize: 10,
        sortOption: 'typenameasc',

        addTokenContract: {
          show: false,
          address: null,
          type: null,
          symbol: null,
          name: null,
          decimals: null,
          totalSupply: null,
          slug: null,
          image: null,
        },
        version: 1,
      },
      defaultPhrase: "I want to login into my stealth wallet on Ethereum mainnet.",
      addressTypeInfo: {
        "address": { variant: "warning", name: "My Address" },
        "stealthAddress": { variant: "dark", name: "My Stealth Address" },
        "stealthMetaAddress": { variant: "success", name: "My Stealth Meta-Address" },
      },
      accountTypes: [
        { value: null, text: '(unknown)' },
        { value: 'address', text: 'Address' },
        { value: 'stealthAddress', text: 'Stealth Address' },
        { value: 'stealthMetaAddress', text: 'Stealth Meta-Address' },
        { value: 'erc20', text: 'ERC-20 Token Contract' },
        { value: 'erc721', text: 'ERC-721 Token Contract' },
      ],
      accountTypeFilters: [
        { value: null, text: '(all)' },
        { value: 'eoa', text: 'EOA' },
        { value: 'contract', text: 'Contract' },
        { value: 'preerc721', text: 'pre ERC-721' },
        { value: 'erc721', text: 'ERC-721' },
        { value: 'erc1155', text: 'ERC-1155' },
        { value: 'erc20', text: 'ERC-20' },
        { value: 'exchangewallet', text: 'Exchange Wallet' },
        { value: 'erc20exchange', text: 'ERC-20 Exchange' },
        { value: 'nftexchange', text: 'NFT Exchange' },
        { value: 'unknown', text: '(unknown)' },
      ],
      myAccountsFilterOptions: [
        { value: null, text: 'All Accounts' },
        { value: 'mine', text: 'My Accounts' },
        { value: 'notmine', text: 'Not My Accounts' },
      ],
      tokenTypeOptions: [
        { value: null, text: '(not token)' },
        { value: 20, text: 'ERC-20' },
        { value: 721, text: 'ERC-721' },
        { value: 1155, text: 'ERC-1155' },
      ],
      sortOptions: [
        { value: 'typenameasc', text: '▲ Type, ▲ Name' },
        { value: 'typenamedsc', text: '▼ Type, ▲ Name' },
        { value: 'nameaddressasc', text: '▲ Name, ▲ Address' },
        { value: 'nameaddressdsc', text: '▼ Name, ▲ Address' },
        { value: 'addressasc', text: '▲ Address' },
        { value: 'addressdsc', text: '▼ Address' },
      ],
      tokenContractsFields: [
        { key: 'number', label: '#', sortable: false, thStyle: 'width: 5%;', tdClass: 'text-truncate' },
        { key: 'options', label: 'Options', sortable: false, thStyle: 'width: 15%;', thClass: 'text-left', tdClass: 'text-left' },
        { key: 'tokenContract', label: 'Token Contract', sortable: false, thStyle: 'width: 45%;', tdClass: 'text-left' },
        { key: 'name', label: 'Name', sortable: false, thStyle: 'width: 20%;', tdClass: 'text-truncate' },
        { key: 'image', label: 'Image', sortable: false, thStyle: 'width: 15%;', tdClass: 'text-truncate' },
      ],
    }
  },
  computed: {
    chainId() {
      return store.getters['connection/chainId'];
    },
    networkSupported() {
      return store.getters['connection/networkSupported'];
    },
    transferHelper() {
      return store.getters['connection/transferHelper'];
    },
    explorer() {
      return store.getters['connection/explorer'];
    },
    tokenContracts() {
      return store.getters['data/tokenContracts'];
    },
    addresses() {
      return store.getters['data/addresses'];
    },
    ens() {
      return store.getters['data/ens'];
    },
    pageSizes() {
      return store.getters['config/pageSizes'];
    },
    sync() {
      return store.getters['data/sync'];
    },
    checkOptions() {
      return store.getters['data/checkOptions'];
    },
    sampleTokenContracts() {
      const results = [];
      const tokens = this.chainId && NETWORKS[this.chainId] && NETWORKS[this.chainId].tokens || [];
      for (const token of tokens) {
        results.push(token);
      }
      return results;
    },

    totalTokenContracts() {
      return Object.keys(this.addresses).length;
    },
    filteredTokenContracts() {
      const results = (store.getters['data/forceRefresh'] % 2) == 0 ? [] : [];
      const filterLower = this.settings.filter && this.settings.filter.toLowerCase() || null;
      // console.log("this.tokenContracts: " + JSON.stringify(this.tokenContracts, null, 2));
      for (const [address, data] of Object.entries(this.tokenContracts[this.chainId] || {})) {
        // console.log(address + " => " + JSON.stringify(data));
        results.push({
          address,
          ...data,
        });
      }
      // for (const [account, accountData] of Object.entries(this.addresses)) {
      //   const ensName = this.ens && account.substring(0, 2) == "0x" && this.ens[account] || null;
      //   const accountName = accountData.name || null;
      //   let include = filterLower == null ||
      //     (account.toLowerCase().includes(filterLower)) ||
      //     (accountName && accountName.toLowerCase().includes(filterLower));
      //   if (include && this.settings.myAccountsFilter != null) {
      //     if (this.settings.myAccountsFilter == 'mine' && accountData.mine) {
      //     } else if (this.settings.myAccountsFilter == 'notmine' && !accountData.mine) {
      //     } else {
      //       include = false;
      //     }
      //   }
      //   if (include) {
      //     results.push({
      //       account,
      //       ensName,
      //       ...accountData,
      //       viewingPrivateKey: undefined,
      //     });
      //   }
      // }
      return results;
    },
    filteredSortedTokenContracts() {
      const results = this.filteredTokenContracts;
      // if (this.settings.sortOption == 'typenameasc') {
      //   results.sort((a, b) => {
      //     if (('' + a.type).localeCompare(b.type) == 0) {
      //       if (('' + a.name).localeCompare(b.name) == 0) {
      //         return ('' + a.account).localeCompare(b.account);
      //       } else {
      //         return ('' + a.name).localeCompare(b.name);
      //       }
      //     } else {
      //       return ('' + a.type).localeCompare(b.type);
      //     }
      //   });
      // } else if (this.settings.sortOption == 'typenamedsc') {
      //   results.sort((a, b) => {
      //     if (('' + a.type).localeCompare(b.type) == 0) {
      //       if (('' + a.name).localeCompare(b.name) == 0) {
      //         return ('' + a.account).localeCompare(b.account);
      //       } else {
      //         return ('' + a.name).localeCompare(b.name);
      //       }
      //     } else {
      //       return ('' + b.type).localeCompare(a.type);
      //     }
      //   });
      // } else if (this.settings.sortOption == 'nameaddressasc') {
      //   results.sort((a, b) => {
      //     if (('' + a.name).localeCompare(b.name) == 0) {
      //       return ('' + a.account).localeCompare(b.account);
      //     } else {
      //       return ('' + a.name).localeCompare(b.name);
      //     }
      //   });
      // } else if (this.settings.sortOption == 'nameaddressdsc') {
      //   results.sort((a, b) => {
      //     if (('' + a.name).localeCompare(b.name) == 0) {
      //       return ('' + b.account).localeCompare(a.account);
      //     } else {
      //       return ('' + b.name).localeCompare(a.name);
      //     }
      //   });
      // } else if (this.settings.sortOption == 'addressasc') {
      //   results.sort((a, b) => {
      //     return ('' + a.account).localeCompare(b.account);
      //   });
      // } else if (this.settings.sortOption == 'addressdsc') {
      //   results.sort((a, b) => {
      //     return ('' + b.account).localeCompare(a.account);
      //   });
      // }
      return results;
    },
    pagedFilteredSortedTokenContracts() {
      console.log(now() + " INFO TokenContracts:computed.filteredSortedTokenContracts - results[0..1]: " + JSON.stringify(this.filteredSortedTokenContracts.slice(0, 2), null, 2));
      return this.filteredSortedTokenContracts.slice((this.settings.currentPage - 1) * this.settings.pageSize, this.settings.currentPage * this.settings.pageSize);
    },
  },
  methods: {
    async loadTokenContract(address) {
      console.log(now() + " INFO TokenContracts:methods.loadTokenContract - address: " + address);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      this.settings.addTokenContract.type = null;
      this.settings.addTokenContract.symbol = null;
      this.settings.addTokenContract.name = null;
      this.settings.addTokenContract.decimals = null;
      this.settings.addTokenContract.totalSupply = null;
      this.settings.addTokenContract.slug = null;
      this.settings.addTokenContract.image = null;

      const code = await provider.getCode(address);
      if (code && code.length > 2) {
        const erc165 = new ethers.Contract(address, ERC165ABI, provider);
        const erc20 = new ethers.Contract(address, ERC20ABI, provider);
        try {
          if (await erc165.supportsInterface(ERC721_INTERFACE)) {
            this.settings.addTokenContract.type = 721;
          }
        } catch (e) {
        }
        if (!this.settings.addTokenContract.type) {
          try {
            if (await erc165.supportsInterface(ERC1155_INTERFACE)) {
              this.settings.addTokenContract.type = 1155;
            }
          } catch (e) {
          }
        }
        if (!this.settings.addTokenContract.type) {
          try {
            this.settings.addTokenContract.decimals = await erc20.decimals();
            if (this.settings.addTokenContract.decimals != null) {
              this.settings.addTokenContract.type = 20;
              this.settings.addTokenContract.decimals = decimals;
            }
          } catch (e) {
          }
        }
        if (this.settings.addTokenContract.type == 20) {
          try {
            const symbol = await erc20.symbol();
            if (symbol != null) {
              this.settings.addTokenContract.symbol = symbol;
            }
          } catch (e) {
          }
          try {
            const name = await erc20.name();
            if (name != null) {
              this.settings.addTokenContract.name = name;
            }
          } catch (e) {
          }
          try {
            const totalSupply = await erc20.totalSupply();
            if (totalSupply != null) {
              this.settings.addTokenContract.totalSupply = totalSupply.toString();
            }
          } catch (e) {
          }
        }
        if (this.settings.addTokenContract.type == 721 || this.settings.addTokenContract.type == 1155) {
          const reservoirPrefix = this.chainId && NETWORKS[this.chainId] && NETWORKS[this.chainId].reservoir || null;
          console.log(now() + " INFO TokenContracts:methods.loadTokenContract - reservoirPrefix: " + reservoirPrefix);
          if (reservoirPrefix) {
            let url = reservoirPrefix + "collections/v7?id=" + address;
            console.log(now() + " INFO TokenContracts:methods.loadTokenContract - url: " + url);
            const data = await fetch(url).then(response => response.json());
            console.log(now() + " INFO TokenContracts:methods.loadTokenContract - data: " + JSON.stringify(data, null, 2));
            if (data.collections && data.collections.length > 0) {
              const collection = data.collections[0];
              console.log(now() + " INFO TokenContracts:methods.loadTokenContract - collection: " + JSON.stringify(collection, null, 2));
              this.settings.addTokenContract.symbol = collection.symbol;
              this.settings.addTokenContract.name = collection.name;
              this.settings.addTokenContract.slug = collection.slug;
              this.settings.addTokenContract.image = collection.image;
            }
          }
        }

      }
      this.saveSettings();
      console.log(now() + " INFO TokenContracts:methods.loadTokenContract - settings.addTokenContract: " + JSON.stringify(this.settings.addTokenContract, null, 2));
    },
    addTokenContract() {
      console.log(now() + " INFO TokenContracts:methods.addTokenContract - settings.addTokenContract: " + JSON.stringify(this.settings.addTokenContract, null, 2));
      this.$refs['modaladdtokencontract'].hide();
      store.dispatch('data/addTokenContract', { chainId: this.chainId, ...this.settings.addTokenContract });
      this.settings.addTokenContract.show = false;
      this.saveSettings();
    },
    deleteTokenContract(address) {
      console.log(now() + " INFO TokenContracts:methods.deleteTokenContract - address: " + JSON.stringify(address));
      this.$bvModal.msgBoxConfirm("Delete " + address.substring(0, 10) + '...' + address.slice(-8) + "?")
        .then(value => {
          if (value) {
            store.dispatch('data/deleteTokenContract', { chainId: this.chainId, address });
          }
        })
        .catch(err => {
        });
    },
    validAddress(a) {
      if (a) {
        try {
          const address = ethers.utils.getAddress(a);
          return true;
        } catch (e) {
        }
      }
      return false;
    },
    formatDecimals(e, decimals = 0) {
      return e != null ? ethers.utils.formatUnits(e, decimals).replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, ',') : null;
    },
    saveSettings() {
      console.log(now() + " INFO TokenContracts:methods.saveSettings - tokenAgentTokenContractsSettings: " + JSON.stringify(this.settings, null, 2));
      localStorage.tokenAgentTokenContractsSettings = JSON.stringify(this.settings);
    },

    newTransfer(stealthMetaAddress = null) {
      console.log(now() + " INFO TokenContracts:methods.newTransfer - stealthMetaAddress: " + stealthMetaAddress);
      store.dispatch('newTransfer/newTransfer', stealthMetaAddress);
    },

    formatAddress(address) {
      const STEALTHMETAADDRESS_SEGMENT_LENGTH = 20;
      // const ADDRESS_SEGMENT_LENGTH = 8;
      if (address) {
        if (address.substring(0, 3) == "st:") {
          return address.substring(0, STEALTHMETAADDRESS_SEGMENT_LENGTH + 9) + '...' + address.slice(-STEALTHMETAADDRESS_SEGMENT_LENGTH);
        } else {
          return address;
          // return address.substring(0, ADDRESS_SEGMENT_LENGTH + 2) + '...' + address.slice(-ADDRESS_SEGMENT_LENGTH);
        }
      }
      return null;
    },

    viewModalAddAccount() {
      console.log(now() + " INFO TokenContracts:methods.viewModalAddAccount BEGIN: " + JSON.stringify(this.settings.newAccount, null, 2));
      store.dispatch('newAddress/newAddress');
    },

    rowSelected(item) {
      console.log(now() + " INFO TokenContracts:methods.rowSelected BEGIN: " + JSON.stringify(item, null, 2));
      if (item && item.length > 0) {
        const account = item[0].account;
        if (account.substring(0, 3) == "st:") {
          store.dispatch('viewStealthMetaAddress/viewStealthMetaAddress', item[0].account);
        } else {
          store.dispatch('viewAddress/viewAddress', item[0].account);
        }
        this.$refs.tokenContractsTable.clearSelected();
      }
    },

    addNewAddress() {
      console.log(now() + " INFO TokenContracts:methods.addNewAddress: " + JSON.stringify(this.newAccount, null, 2));
      this.$refs['modalnewaddress'].hide();
      store.dispatch('data/addNewAddress', this.newAccount);
    },
    addCoinbase() {
      console.log(now() + " INFO TokenContracts:methods.addCoinbase - coinbase: " + store.getters['connection/coinbase']);
      store.dispatch('data/addNewAddress', store.getters['connection/coinbase']);
    },
    toggleSelectedAccounts(items) {
      let someFalse = false;
      let someTrue = false;
      for (const item of items) {
        if (this.settings.selectedAccounts[item.account]) {
          someTrue = true;
        } else {
          someFalse = true;
        }
      }
      for (const item of items) {
        if (!(someTrue && !someFalse)) {
          Vue.set(this.settings.selectedAccounts, item.account, true);
        } else {
          Vue.delete(this.settings.selectedAccounts, item.account);
        }
      }
      this.saveSettings();
    },
    clearSelectedAccounts() {
      this.settings.selectedAccounts = {};
      this.saveSettings();
    },
    async toggleTokenContractField(address, field) {
      console.log(now() + " INFO TokenContracts:methods.toggleTokenContractField - address: " + address + ", field: " + field);
      store.dispatch('data/toggleTokenContractField', { chainId: this.chainId, address, field });
    },
    async setAddressField(address, field, value) {
      console.log(now() + " INFO TokenContracts:methods.setAddressField - address: " + address + ", field: " + field + ", value: " + value);
      store.dispatch('data/setAddressField', { address, field, value });
    },
    async deleteAddress(account, modalRef) {
      this.$bvModal.msgBoxConfirm('Are you sure?')
        .then(value => {
          if (value) {
            store.dispatch('data/deleteAddress', account);
            this.$refs[modalRef].hide();
          }
        })
        .catch(err => {
          // An error occurred
        })
    },
    async viewSyncOptions() {
      store.dispatch('syncOptions/viewSyncOptions');
    },
    async halt() {
      store.dispatch('data/setSyncHalt', true);
    },
    ensOrAccount(account, length = 0) {
      let result = null;
      if (this.ensMap && account in this.ensMap) {
        result = this.ensMap[account];
      }
      if (result == null || result.length == 0) {
        result = account;
      }
      return result == null || result.length == 0 ? null : (length == 0 ? result : result.substring(0, length));
    },
    hasENS(account) {
      if (this.ensMap && account in this.ensMap) {
        result = this.ensMap[account];
        if (result != account) {
          return true;
        }
      }
      return false;
    },
    ensOrNull(account, length = 0) {
      let result = null;
      if (this.ensMap && account in this.ensMap) {
        result = this.ensMap[account];
        if (result == account) {
          result = null;
        }
      }
      return result == null || result.length == 0 ? null : (length == 0 ? result : result.substring(0, length));
    },
    copyToClipboard(str) {
      navigator.clipboard.writeText(str);
    },
    exportAccounts() {
      console.log("exportAccounts");
      const rows = [
          ["No", "Account", "Type", "Mine", "ENSName", "Group", "Name", "Notes"],
      ];
      let i = 1;
      for (const result of this.filteredSortedTokenContracts) {
        rows.push([
          i,
          result.account,
          result.type,
          result.mine ? "y" : "n",
          this.ensMap[result.account] || null,
          result.group,
          result.name,
          result.notes,
        ]);
        i++;
      }
      let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "txs_account_export-" + moment().format("YYYY-MM-DD-HH-mm-ss") + ".csv");
      document.body.appendChild(link); // Required for FF
      link.click(); // This will download the data with the specified file name
    },
    async timeoutCallback() {
      logDebug("TokenContracts", "timeoutCallback() count: " + this.count);
      this.count++;
      var t = this;
      if (this.reschedule) {
        setTimeout(function() {
          t.timeoutCallback();
        }, 15000);
      }
    },
  },
  beforeDestroy() {
    logDebug("TokenContracts", "beforeDestroy()");
  },
  mounted() {
    logDebug("TokenContracts", "mounted() $route: " + JSON.stringify(this.$route.params));
    store.dispatch('data/restoreState');
    if ('tokenAgentTokenContractsSettings' in localStorage) {
      const tempSettings = JSON.parse(localStorage.tokenAgentTokenContractsSettings);
      if ('version' in tempSettings && tempSettings.version == this.settings.version) {
        this.settings = tempSettings;
        this.settings.currentPage = 1;
      }
    }
    this.reschedule = true;
    logDebug("TokenContracts", "Calling timeoutCallback()");
    this.timeoutCallback();
  },
  destroyed() {
    this.reschedule = false;
  },
};

const tokenContractsModule = {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
};
