import { Builder, Capabilities } from 'selenium-webdriver';
import phantomjs from 'phantomjs-prebuilt';

const phantomJSCapabilities = Capabilities.phantomjs();
phantomJSCapabilities.set("phantomjs.binary.path", phantomjs.path);
phantomJSCapabilities.set("phantomjs.cli.args", ['--ignore-ssl-errors=true']);

export default async () => await new Builder()
	.withCapabilities(phantomJSCapabilities)
	.build();

export const waitForServerStart = async (driver, url) => {
	return await driver.wait(async driver => {
			await driver.get(url);
			let title = await driver.getTitle();
			return title.length;
	}, 5 * 1000, 'Server did not respond in 5 seconds!');
};
