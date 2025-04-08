GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('akreyrium_phase_binder')
        .category('akreyrium_phase_binder')
        .setEUIO('in')
        .setMaxIOSize(4, 0, 4, 1)
        .setSound(GTSoundEntries.MACERATOR);
});

// Change fusion recipe
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    GTRecipeTypes.FUSION_RECIPES.setMaxIOSize(1,0,3,1);
});

GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('akreyrium_phase_binder', 'multiblock')
        .rotationState(RotationState.NON_Y_AXIS)
        .recipeType('akreyrium_phase_binder')
        .recipeModifiers([GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.OC_PERFECT])
        .pattern(definition => FactoryBlockPattern.start()
            .aisle("###AAA###", "###BBB###", "###AAA###", "###AAA###", "####A####", "####A####", "#########", "#########", "#########") 
            .aisle("#AAAAAAA#", "#BBBEBBB#", "#BADEDAB#", "#A##E##A#", "####E####", "####E####", "####F####", "###ABA###", "###AAA###") 
            .aisle("#AAAAAAA#", "#BBDDDBB#", "#ADDDDDA#", "###GGG###", "###BBB###", "###BEB###", "###BFB###", "##BGGGB##", "##AGAGA##") 
            .aisle("AAAAAAAAA", "BBDDCDDBB", "ADDDCDDDA", "A#GDCDG#A", "##BDCDB##", "##BCECB##", "##BCHCB##", "#AGBBBGA#", "#AGDADGA#") 
            .aisle("AAAAAAAAA", "CCCCFCCCC", "CEDCFCDEC", "AEGCFCGEA", "AEBCFCBEA", "AEEEHEEEA", "#FFH#HFF#", "#BGBHBGB#", "#AAAFAAA#") 
            .aisle("AAAAAAAAA", "BBDDCDDBB", "ADDDCDDDA", "A#GDCDG#A", "##BDCDB##", "##BCECB##", "##BCHCB##", "#AGBBBGA#", "#AGDADGA#") 
            .aisle("#AAAAAAA#", "#BBDDDBB#", "#ADDDDDA#", "###GGG###", "###BBB###", "###BEB###", "###BFB###", "##BGGGB##", "##AGAGA##") 
            .aisle("#AAAAAAA#", "#BBBEBBB#", "#BADEDAB#", "#A##E##A#", "####E####", "####E####", "####F####", "###ABA###", "###AAA###") 
            .aisle("###AAA###", "###BBB###", "###AAA###", "###A@A###", "####A####", "####A####", "#########", "#########", "#########") 
            .where("#", Predicates.any())
            .where("A", Predicates.blocks("gtceu:robust_machine_casing"))
            .where("B", Predicates.blocks("gtceu:fusion_glass")
                .or(Predicates.autoAbilities(definition.getRecipeTypes()))
                .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1)))
            .where("C", Predicates.blocks("kubejs:enriched_naquadah_pipe_casing"))
            .where("D", Predicates.blocks("gtceu:computer_casing"))
            .where("E", Predicates.blocks("gtceu:high_power_casing"))
            .where("F", Predicates.blocks("kubejs:stellarium_casing"))
            .where("G", Predicates.blocks("gtceu:advanced_computer_casing"))
            .where("H", Predicates.blocks("kubejs:ancient_runicalium_casing"))
            .where("@", Predicates.controller(Predicates.blocks(definition.get())))
            .build())
        .workableCasingRenderer("gtceu:block/casings/solid/machine_casing_robust_tungstensteel",
            "gtceu:block/multiblock/hpca", false);
});

