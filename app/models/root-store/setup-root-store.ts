import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore, initialUser } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
    const env = new Environment()
    await env.setup()
    return env
}

const initialAssessment = {
    reachedDiagnosis: false,
    diagnoses: {},
    patient: {
        age: 5,
        location: "arusha",
        riskFactors: ["smoking"],
        sex: "female",
        symptoms: {
            present: [],
            absent: [],
            skip: [],
        },
    },
    nextNodes: ["here"],
    qrcodeScanComplete:false,
    qrcode:""
}

const initialCenters = {
    loadingCenters: true,
    centersList: [],
}

const initialCenterAppointments = {
    appointmentsList: [],
    loadingAppointments: true,
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
    let rootStore: RootStore
    let data: any

    // prepare the environment that will be associated with the RootStore.
    const env = await createEnvironment()
    try {
        // load data from storage
        data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
        rootStore = RootStoreModel.create(
            {
                assessment: initialAssessment,
                application: { loadingAssessments: false },
                account: { ...initialUser },
                centers: initialCenters,
                centerAppointments: initialCenterAppointments,
                ...data,
            },
            env,
        )
        // console.log(rootStore)
        // rootStore.initializeAccount()
    } catch (e) {
        // if there's any problems loading, then let's at least fallback to an empty state
        // instead of crashing.
        rootStore = RootStoreModel.create({}, env)

        // but please inform us what happened
        __DEV__ && console.tron.error(e.message, null)
    }

    // reactotron logging
    if (__DEV__) {
        env.reactotron.setRootStore(rootStore, data)
    }

    // track changes & save to storage
    onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

    return rootStore
}