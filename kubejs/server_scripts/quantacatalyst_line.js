


ServerEvents.recipes(event => {


    event.recipes.gtceu.assembly_line('akreyrium_phase_binder')
        .itemInputs(
            'gtceu:uhv_machine_hull', '48x #gtceu:circuits/uhv', '24x gtceu:neutronium_large_fluid_pipe', '16x gtceu:uhv_fluid_regulator', '12x gtceu:ancient_runicalium_gear', 
            '12x gtceu:ancient_runicalium_gear', '4x gtceu:uhv_field_generator', '4x gtceu:uhv_electric_motor') 
        .inputFluids('gtceu:stellarium 9216','gtceu:utopian_akreyrium 4000')
        .itemOutputs('gtceu:akreyrium_phase_binder')
        .duration(4000)
        .stationResearch(
            researchRecipeBuilder => researchRecipeBuilder
                .researchStack(Item.of("gtceu:utopian_akreyrium_bucket"))
                .EUt(GTValues.VHA[GTValues.UV])
                .CWUt(144)
        )
        .EUt(GTValues.VA[GTValues.UV]); 


    //Quantacatalyst Line
    event.recipes.gtceu.super_pressure_heat_chamber('crystaflux')
        .itemInputs('10x kubejs:crystallised_akreyrium', "512x fluxnetworks:flux_dust")
        .inputFluids('gtceu:enderium 8000')
        .itemOutputs('10x gtceu:crystaflux_dust')
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UHV])

    event.recipes.gtceu.akreyrium_phase_binder('quanticatalyst_x9')
        .itemInputs('6x gtceu:crystaflux_dust', '1x gtceu:neutronium_dust')
        .inputFluids('gtceu:helium_3 500', 'gtceu:utopian_akreyrium 10000')
        .outputFluids('gtceu:quantacatalyst_x9 100')
        .duration(2000)
        .EUt(GTValues.VA[GTValues.UHV]);
    //Catalyst Recipes

    console.log("INCOMING1");
    event.forEachRecipe({type:"gtceu:fusion_reactor"}, r => {
        var jRecipe = JSON.parse(r.json);
            var rDuration = jRecipe.duration;
            var rEUStart = jRecipe.data.eu_to_start;
            var rEUt = jRecipe.tickInputs.eu[0].content;
            var rFluid1 = jRecipe.inputs.fluid[0].content;
            var rFluid2 = jRecipe.inputs.fluid[1].content;
            var rOut = jRecipe.outputs.fluid[0].content;
        
        console.log(`rDur ${rDuration}, rEUs ${rEUStart}, rEUt ${rEUt}, rF1 ${rFluid1.value[0].tag}: ${rFluid1.amount}mB, rF2 ${rFluid2.value[0].tag}: ${rFluid2.amount}mB, rOut ${rOut.value[0].fluid}: ${rOut.amount}mB`);

        event.recipes.gtceu.fusion_reactor(`quanticatalize_x9_batched_${rOut.value[0].fluid.slice(6)}`)
            .inputFluids(Fluid.of(`gtceu:${rFluid1.value[0].tag.slice(6)}`, rFluid1.amount * 10), Fluid.of(`gtceu:${rFluid2.value[0].tag.slice(6)}`, rFluid2.amount * 10), Fluid.of('gtceu:quantacatalyst_x9', 10))
            .outputFluids(Fluid.of(rOut.value[0].fluid, rOut.amount * 12))
            .duration(rDuration * 10)
            .fusionStartEU(rEUStart)
            .EUt(rEUt)
            .circuit(1);
    });

});
/*ServerEvents.recipes(event => {
    console.log("INCOMING")

    event.remove({id:"gtceu:fusion_reactor/americium_and_naquadria_to_neutronium_plasma"});
    event.recipes.gtceu.fusion_reactor("americium_and_naquadria_to_neutronium_plasma")
        .inputFluids(Fluid.of('gtceu:americium', 1280), Fluid.of('gtceu:naquadria', 1280))
        .outputFluids(Fluid.of('gtceu:neutronium', 320))
        .duration(1000)
        .EUt(GTValues.VH[GTValues.UV])
        .fusionStartEU(600000);
}); */