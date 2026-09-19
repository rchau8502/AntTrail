import os
import uuid

def gen_id():
    return uuid.uuid4().hex[:24].upper()

root_dir = os.path.abspath("apps/scholarstack-ios/ScholarStack")
project_dir = os.path.abspath("apps/scholarstack-ios/ScholarStack.xcodeproj")
os.makedirs(project_dir, exist_ok=True)

swift_files = []
resource_files = []

for r, d, f in os.walk(root_dir):
    for file in f:
        rel_path = os.path.relpath(os.path.join(r, file), root_dir)
        if file.endswith(".swift"):
            swift_files.append(rel_path)
        elif file.endswith(".json") and "Resources/Data" in rel_path:
            resource_files.append(rel_path)

resource_files.append("Resources/Assets.xcassets")

print(f"Found {len(swift_files)} swift files and {len(resource_files)} resources")

file_refs = {}

for f in swift_files:
    fid = gen_id()
    bid = gen_id()
    file_refs[f] = (fid, bid, "sourcecode.swift")

for f in resource_files:
    fid = gen_id()
    bid = gen_id()
    file_type = "folder.assetcatalog" if f.endswith(".xcassets") else "text.json"
    file_refs[f] = (fid, bid, file_type)

group_id_main = gen_id()
group_id_sources = gen_id()
group_id_products = gen_id()
app_product_id = gen_id()
target_id = gen_id()
project_id = gen_id()
sources_build_phase_id = gen_id()
resources_build_phase_id = gen_id()
frameworks_build_phase_id = gen_id()
config_debug_target = gen_id()
config_release_target = gen_id()
config_list_target = gen_id()
config_debug_proj = gen_id()
config_release_proj = gen_id()
config_list_proj = gen_id()

# PBXBuildFile
pbx_build_file_lines = []
for path, (fid, bid, ftype) in file_refs.items():
    fname = os.path.basename(path)
    phase = "Sources" if ftype == "sourcecode.swift" else "Resources"
    pbx_build_file_lines.append(f"\t\t{bid} /* {fname} in {phase} */ = {{isa = PBXBuildFile; fileRef = {fid} /* {path} */; }};")

# PBXFileReference
pbx_file_ref_lines = []
for path, (fid, bid, ftype) in file_refs.items():
    fname = os.path.basename(path)
    pbx_file_ref_lines.append(f"\t\t{fid} /* {path} */ = {{isa = PBXFileReference; lastKnownFileType = {ftype}; path = \"{path}\"; sourceTree = \"<group>\"; }};")

pbx_file_ref_lines.append(f"\t\t{app_product_id} /* ScholarStack.app */ = {{isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ScholarStack.app; sourceTree = BUILT_PRODUCTS_DIR; }};")

# PBXSourcesBuildPhase
sources_lines = []
for path, (fid, bid, ftype) in file_refs.items():
    if ftype == "sourcecode.swift":
        fname = os.path.basename(path)
        sources_lines.append(f"\t\t\t\t{bid} /* {fname} in Sources */,")

# PBXResourcesBuildPhase
resources_lines = []
for path, (fid, bid, ftype) in file_refs.items():
    if ftype != "sourcecode.swift":
        fname = os.path.basename(path)
        resources_lines.append(f"\t\t\t\t{bid} /* {fname} in Resources */,")

# Main group children
main_children = []
for path, (fid, bid, ftype) in file_refs.items():
    main_children.append(f"\t\t\t\t{fid} /* {path} */,")

pbx_content = f"""// !$*UTF8*$!
{{
	archiveVersion = 1;
	classes = {{
	}};
	objectVersion = 56;
	objects = {{

/* Begin PBXBuildFile section */
{chr(10).join(pbx_build_file_lines)}
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
{chr(10).join(pbx_file_ref_lines)}
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		{frameworks_build_phase_id} /* Frameworks */ = {{
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		}};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		{group_id_main} = {{
			isa = PBXGroup;
			children = (
				{group_id_sources} /* ScholarStack */,
				{group_id_products} /* Products */,
			);
			sourceTree = "<group>";
		}};
		{group_id_products} = {{
			isa = PBXGroup;
			children = (
				{app_product_id} /* ScholarStack.app */,
			);
			name = Products;
			sourceTree = "<group>";
		}};
		{group_id_sources} = {{
			isa = PBXGroup;
			children = (
{chr(10).join(main_children)}
			);
			path = ScholarStack;
			sourceTree = "<group>";
		}};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		{target_id} /* ScholarStack */ = {{
			isa = PBXNativeTarget;
			buildConfigurationList = {config_list_target} /* Build configuration list for PBXNativeTarget "ScholarStack" */;
			buildPhases = (
				{sources_build_phase_id} /* Sources */,
				{frameworks_build_phase_id} /* Frameworks */,
				{resources_build_phase_id} /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ScholarStack;
			productName = ScholarStack;
			productReference = {app_product_id} /* ScholarStack.app */;
			productType = "com.apple.product-type.application";
		}};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		{project_id} /* Project object */ = {{
			isa = PBXProject;
			attributes = {{
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1600;
				LastUpgradeCheck = 1600;
				TargetAttributes = {{
					{target_id} = {{
						CreatedOnToolsVersion = 16.0;
					}};
				}};
			}};
			buildConfigurationList = {config_list_proj} /* Build configuration list for PBXProject "ScholarStack" */;
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = {group_id_main};
			productRefGroup = {group_id_products} /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				{target_id} /* ScholarStack */,
			);
		}};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		{resources_build_phase_id} /* Resources */ = {{
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
{chr(10).join(resources_lines)}
			);
			runOnlyForDeploymentPostprocessing = 0;
		}};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		{sources_build_phase_id} /* Sources */ = {{
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
{chr(10).join(sources_lines)}
			);
			runOnlyForDeploymentPostprocessing = 0;
		}};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		{config_debug_proj} /* Debug */ = {{
			isa = XCBuildConfiguration;
			buildSettings = {{
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_PREVIEWS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = "DEBUG $(inherited)";
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 6.0;
			}};
			name = Debug;
		}};
		{config_release_proj} /* Release */ = {{
			isa = XCBuildConfiguration;
			buildSettings = {{
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_PREVIEWS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_NO_COMMON_BLOCKS = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_VERSION = 6.0;
				VALIDATE_PRODUCT = YES;
			}};
			name = Release;
		}};
		{config_debug_target} /* Debug */ = {{
			isa = XCBuildConfiguration;
			buildSettings = {{
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGNING_ALLOWED = NO;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				ENABLE_PREVIEWS = NO;
				GENERATE_INFOPLIST_FILE = NO;
				INFOPLIST_FILE = ScholarStack/Info.plist;
				INFOPLIST_KEY_CFBundleDisplayName = ScholarStack;
				INFOPLIST_KEY_LSApplicationCategoryType = "public.app-category.education";
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0.0;
				PRODUCT_BUNDLE_IDENTIFIER = org.scholarstack.app;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_VERSION = 6.0;
				TARGETED_DEVICE_FAMILY = "1,2";
			}};
			name = Debug;
		}};
		{config_release_target} /* Release */ = {{
			isa = XCBuildConfiguration;
			buildSettings = {{
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGNING_ALLOWED = NO;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				ENABLE_PREVIEWS = NO;
				GENERATE_INFOPLIST_FILE = NO;
				INFOPLIST_FILE = ScholarStack/Info.plist;
				INFOPLIST_KEY_CFBundleDisplayName = ScholarStack;
				INFOPLIST_KEY_LSApplicationCategoryType = "public.app-category.education";
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0.0;
				PRODUCT_BUNDLE_IDENTIFIER = org.scholarstack.app;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_VERSION = 6.0;
				TARGETED_DEVICE_FAMILY = "1,2";
			}};
			name = Release;
		}};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		{config_list_proj} /* Build configuration list for PBXProject "ScholarStack" */ = {{
			isa = XCConfigurationList;
			buildConfigurations = (
				{config_debug_proj} /* Debug */,
				{config_release_proj} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		}};
		{config_list_target} /* Build configuration list for PBXNativeTarget "ScholarStack" */ = {{
			isa = XCConfigurationList;
			buildConfigurations = (
				{config_debug_target} /* Debug */,
				{config_release_target} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		}};
/* End XCConfigurationList section */

	}};
	rootObject = {project_id} /* Project object */;
}}
"""

with open(os.path.join(project_dir, "project.pbxproj"), "w") as out:
    out.write(pbx_content)

print(f"Successfully generated {os.path.join(project_dir, 'project.pbxproj')}")
