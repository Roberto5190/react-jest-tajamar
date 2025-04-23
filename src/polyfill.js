import 'cross-fetch/polyfill'; 
import { TextEncoder, TextDecoder } from 'util';

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;