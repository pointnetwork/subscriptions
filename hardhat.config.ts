import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import {hdkey} from 'ethereumjs-wallet';
import {mnemonicToSeedSync} from 'bip39';
import fs from 'fs';
import {HardhatUserConfig} from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import './tasks/deploy';

dotenv.config();

let privateKey = process.env.DEPLOYER_ACCOUNT;

try {
    if (privateKey === undefined) {
        const homedir = os.homedir();
        const wallet = hdkey.fromMasterSeed(
            mnemonicToSeedSync(
                JSON.parse(fs.readFileSync(path.resolve(
                    homedir,
                    '.point',
                    'keystore',
                    'key.json'
                ), 'utf8')).phrase
            )
        ).getWallet();
        privateKey = wallet.getPrivateKey().toString('hex');
    }
} catch (e) {
    if (!privateKey) {
        console.log(
            'Warn: Private key not found. Will not be possible to deploy.'
        );
    }
}

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.0',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000
                    }
                }
            },
            {
                version: '0.8.4',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000
                    }
                }
            },
            {
                version: '0.8.7',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000
                    }
                }
            }
        ]
    },
    networks: {
        xnetUranus: {
            accounts: [privateKey!],
            url: 'https://xnet-uranus-1.point.space/',
            gasPrice: 7
        },
        mainnet: {
            accounts: [privateKey!],
            url: 'https://rpc-mainnet-1.point.space',
            gasPrice: 7
        }
    }
};

export default config;
