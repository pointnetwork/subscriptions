import {task} from 'hardhat/config';

task('deploy')
    .setAction(async (_, hre) => {
        const factory = await hre.ethers.getContractFactory('Subscriptions');
        const contract = await hre.upgrades.deployProxy(factory, [], {kind: 'uups'});
        await contract.deployed();
        console.log('Done: ', contract.address);
    });
